import React from "react";
import {
	AbsoluteFill,
	Sequence,
	interpolate,
	useCurrentFrame,
	useVideoConfig,
	Easing,
} from "remotion";

const FONT_FAMILY = "Inter, sans-serif";

const colors = {
	bg0: "#070A12",
	bg1: "#0B1222",
	text: "#F5F7FF",
	muted: "rgba(245,247,255,0.72)",
	accent: "#7C5CFF",
	accent2: "#2EE6A6",
};

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

const mix = (a: number, b: number, t: number) => a + (b - a) * t;

const hexToRgb = (hex: string) => {
	const h = hex.replace("#", "").trim();
	const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
	const n = parseInt(full, 16);
	return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
};

const rgba = (hex: string, a: number) => {
	const { r, g, b } = hexToRgb(hex);
	return `rgba(${r}, ${g}, ${b}, ${a})`;
};

const Background: React.FC = () => {
	const frame = useCurrentFrame();
	const { width, height } = useVideoConfig();

	const t = frame / 240;
	const driftX = Math.sin(t * Math.PI * 2) * 22;
	const driftY = Math.cos(t * Math.PI * 2) * 14;

	return (
		<AbsoluteFill
			style={{
				background: `radial-gradient(1200px 700px at 20% 20%, ${rgba(
					colors.accent,
					0.22
				)} 0%, rgba(0,0,0,0) 60%),
          radial-gradient(900px 600px at 80% 30%, ${rgba(
						colors.accent2,
						0.16
					)} 0%, rgba(0,0,0,0) 65%),
          linear-gradient(135deg, ${colors.bg0} 0%, ${colors.bg1} 55%, ${colors.bg0} 100%)`,
				overflow: "hidden",
				fontFamily: FONT_FAMILY,
			}}
		>
			{/* Subtle grid */}
			<div
				style={{
					position: "absolute",
					inset: -2,
					opacity: 0.22,
					transform: `translate(${driftX}px, ${driftY}px)`,
					backgroundImage: `
            linear-gradient(rgba(245,247,255,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(245,247,255,0.06) 1px, transparent 1px)
          `,
					backgroundSize: "56px 56px",
					maskImage:
						"radial-gradient(60% 65% at 50% 45%, black 0%, transparent 72%)",
					WebkitMaskImage:
						"radial-gradient(60% 65% at 50% 45%, black 0%, transparent 72%)",
				}}
			/>

			{/* Corner glow */}
			<div
				style={{
					position: "absolute",
					left: -220,
					top: -220,
					width: 560,
					height: 560,
					borderRadius: 560,
					background: `radial-gradient(circle at 35% 35%, ${rgba(
						colors.accent,
						0.35
					)} 0%, rgba(0,0,0,0) 62%)`,
					filter: "blur(10px)",
					opacity: 0.9,
				}}
			/>
			<div
				style={{
					position: "absolute",
					right: -260,
					bottom: -260,
					width: 620,
					height: 620,
					borderRadius: 620,
					background: `radial-gradient(circle at 60% 60%, ${rgba(
						colors.accent2,
						0.28
					)} 0%, rgba(0,0,0,0) 64%)`,
					filter: "blur(10px)",
					opacity: 0.85,
				}}
			/>

			{/* Noise */}
			<div
				style={{
					position: "absolute",
					inset: 0,
					opacity: 0.08,
					mixBlendMode: "overlay",
					backgroundImage:
						"url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"220\" height=\"220\"><filter id=\"n\"><feTurbulence type=\"fractalNoise\" baseFrequency=\"0.9\" numOctaves=\"3\" stitchTiles=\"stitch\"/></filter><rect width=\"220\" height=\"220\" filter=\"url(%23n)\" opacity=\"0.55\"/></svg>')",
				}}
			/>

			{/* Vignette */}
			<div
				style={{
					position: "absolute",
					inset: 0,
					background:
						"radial-gradient(70% 70% at 50% 50%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.6) 100%)",
					pointerEvents: "none",
				}}
			/>

			{/* Safe area frame */}
			<div
				style={{
					position: "absolute",
					left: width * 0.06,
					right: width * 0.06,
					top: height * 0.1,
					bottom: height * 0.12,
					borderRadius: 28,
					border: "1px solid rgba(245,247,255,0.08)",
					background:
						"linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
					boxShadow: "0 18px 60px rgba(0,0,0,0.35)",
				}}
			/>
		</AbsoluteFill>
	);
};

const WipeReveal: React.FC<{
	progress: number;
	children: React.ReactNode;
	softness?: number;
}> = ({ progress, children, softness = 18 }) => {
	const p = clamp01(progress);
	const left = mix(-20, 100, p);
	return (
		<div
			style={{
				position: "relative",
				display: "inline-block",
				maskImage: `linear-gradient(90deg, transparent 0%, black ${
					left - softness
				}%, black ${left}%, transparent ${left + 0.1}%)`,
				WebkitMaskImage: `linear-gradient(90deg, transparent 0%, black ${
					left - softness
				}%, black ${left}%, transparent ${left + 0.1}%)`,
			}}
		>
			{children}
		</div>
	);
};

const IntroTitle: React.FC = () => {
	const frame = useCurrentFrame();
	const { fps, width } = useVideoConfig();

	const tIn = interpolate(frame, [0, 18], [0, 1], {
		extrapolateLeft: "clamp",
		extrapolateRight: "clamp",
		easing: Easing.out(Easing.cubic),
	});
	const tOut = interpolate(frame, [150, 175], [1, 0], {
		extrapolateLeft: "clamp",
		extrapolateRight: "clamp",
		easing: Easing.in(Easing.cubic),
	});

	const fade = tIn * tOut;

	const slideY = interpolate(frame, [0, 22], [18, 0], {
		extrapolateLeft: "clamp",
		extrapolateRight: "clamp",
		easing: Easing.out(Easing.cubic),
	});

	const micro = Math.sin(frame / (fps / 2)) * 0.6;

	const maxTitleWidth = Math.min(1100, width * 0.82);

	const introduceWipe = interpolate(frame, [8, 22], [0, 1], {
		extrapolateLeft: "clamp",
		extrapolateRight: "clamp",
		easing: Easing.out(Easing.cubic),
	});

	const builderWipe = interpolate(frame, [26, 48], [0, 1], {
		extrapolateLeft: "clamp",
		extrapolateRight: "clamp",
		easing: Easing.out(Easing.cubic),
	});

	return (
		<AbsoluteFill
			style={{
				justifyContent: "center",
				alignItems: "center",
				padding: "0 6%",
				fontFamily: FONT_FAMILY,
			}}
		>
			<div
				style={{
					transform: `translateY(${slideY + micro}px)`,
					opacity: fade,
					width: "100%",
					maxWidth: maxTitleWidth,
					textAlign: "center",
					display: "flex",
					flexDirection: "column",
					gap: 18,
					alignItems: "center",
				}}
			>
				<div
					style={{
						display: "inline-flex",
						alignItems: "center",
						gap: 10,
						padding: "10px 14px",
						borderRadius: 999,
						border: "1px solid rgba(245,247,255,0.12)",
						background:
							"linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.03) 100%)",
						boxShadow: "0 14px 45px rgba(0,0,0,0.35)",
						backdropFilter: "blur(6px)",
						color: colors.muted,
						fontSize: 18,
						letterSpacing: 0.2,
						fontWeight: 500,
					}}
				>
					<span
						style={{
							width: 8,
							height: 8,
							borderRadius: 8,
							background: `linear-gradient(90deg, ${colors.accent} 0%, ${colors.accent2} 100%)`,
							boxShadow: `0 0 0 4px ${rgba(colors.accent, 0.14)}`,
						}}
					/>
					<WipeReveal progress={introduceWipe} softness={20}>
						<span style={{ color: colors.text, opacity: 0.92 }}>
							Introducing
						</span>
					</WipeReveal>
				</div>

				<div
					style={{
						lineHeight: 1.02,
						fontWeight: 800,
						letterSpacing: -1.2,
						fontSize: 86,
						color: colors.text,
						textShadow: "0 18px 60px rgba(0,0,0,0.55)",
					}}
				>
					<WipeReveal progress={builderWipe} softness={22}>
						<span
							style={{
								background: `linear-gradient(90deg, ${colors.text} 0%, rgba(245,247,255,0.9) 40%, rgba(245,247,255,0.82) 100%)`,
								WebkitBackgroundClip: "text",
								backgroundClip: "text",
								color: "transparent",
							}}
						>
							The AI Workflow Builder
						</span>
					</WipeReveal>
				</div>

				<div
					style={{
						marginTop: 8,
						color: "rgba(245,247,255,0.62)",
						fontSize: 20,
						fontWeight: 500,
						letterSpacing: 0.2,
					}}
				>
					Design → automate → ship. In minutes.
				</div>
			</div>
		</AbsoluteFill>
	);
};

const WorkflowHint: React.FC = () => {
	const frame = useCurrentFrame();
	const { width, height } = useVideoConfig();

	const appear = interpolate(frame, [55, 78], [0, 1], {
		extrapolateLeft: "clamp",
		extrapolateRight: "clamp",
		easing: Easing.out(Easing.cubic),
	});
	const settle = interpolate(frame, [55, 92], [16, 0], {
		extrapolateLeft: "clamp",
		extrapolateRight: "clamp",
		easing: Easing.out(Easing.cubic),
	});

	const exit = interpolate(frame, [150, 175], [1, 0], {
		extrapolateLeft: "clamp",
		extrapolateRight: "clamp",
		easing: Easing.in(Easing.cubic),
	});

	const alpha = appear * exit;

	const cardW = Math.min(980, width * 0.82);
	const cardH = Math.min(260, height * 0.3);

	const pulse = 0.5 + 0.5 * Math.sin(frame / 18);

	return (
		<AbsoluteFill
			style={{
				justifyContent: "flex-end",
				alignItems: "center",
				paddingBottom: height * 0.12,
				fontFamily: FONT_FAMILY,
			}}
		>
			<div
				style={{
					width: cardW,
					height: cardH,
					borderRadius: 24,
					border: "1px solid rgba(245,247,255,0.10)",
					background:
						"linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.03) 100%)",
					boxShadow: "0 24px 80px rgba(0,0,0,0.45)",
					backdropFilter: "blur(8px)",
					opacity: alpha,
					transform: `translateY(${settle}px)`,
					padding: 22,
					display: "flex",
					flexDirection: "column",
					gap: 16,
				}}
			>
				<div
					style={{
						display: "flex",
						alignItems: "center",
						gap: 12,
					}}
				>
					<div
						style={{
							width: 42,
							height: 42,
							borderRadius: 12,
							background: `linear-gradient(135deg, ${rgba(
								colors.accent,
								0.9
							)} 0%, ${rgba(colors.accent2, 0.8)} 100%)`,
							boxShadow: `0 14px 40px ${rgba(colors.accent, 0.22)}`,
							display: "grid",
							placeItems: "center",
							color: "rgba(0,0,0,0.75)",
							fontWeight: 900,
							letterSpacing: -0.8,
							fontSize: 18,
						}}
					>
						AI
					</div>
					<div style={{ flex: 1 }}>
						<div
							style={{
								color: colors.text,
								fontSize: 18,
								fontWeight: 700,
								letterSpacing: -0.2,
							}}
						>
							Workflow canvas (demo)
						</div>
						<div
							style={{
								color: "rgba(245,247,255,0.62)",
								fontSize: 14,
								fontWeight: 500,
							}}
						>
							Connect steps, add logic, and automate outcomes.
						</div>
					</div>
					<div
						style={{
							padding: "8px 12px",
							borderRadius: 999,
							border: "1px solid rgba(245,247,255,0.12)",
							color: "rgba(245,247,255,0.78)",
							fontSize: 13,
							fontWeight: 600,
							background: "rgba(0,0,0,0.20)",
						}}
					>
						Live preview
					</div>
				</div>

				{/* Nodes */}
				<div
					style={{
						position: "relative",
						flex: 1,
						borderRadius: 18,
						background: "rgba(0,0,0,0.18)",
						border: "1px solid rgba(245,247,255,0.07)",
						overflow: "hidden",
					}}
				>
					{/* animated connection */}
					<div
						style={{
							position: "absolute",
							left: "12%",
							top: "50%",
							width: "76%",
							height: 2,
							transform: "translateY(-50%)",
							background: `linear-gradient(90deg, rgba(124,92,255,0) 0%, ${rgba(
								colors.accent,
								0.95
							)} 35%, ${rgba(colors.accent2, 0.95)} 65%, rgba(46,230,166,0) 100%)`,
							opacity: 0.35 + 0.35 * pulse,
							filter: "blur(0.2px)",
						}}
					/>

					{/* dots on line */}
					<div
						style={{
							position: "absolute",
							left: `${20 + pulse * 40}%`,
							top: "50%",
							width: 10,
							height: 10,
							borderRadius: 10,
							transform: "translate(-50%, -50%)",
							background: colors.text,
							boxShadow: `0 0 0 6px ${rgba(colors.accent, 0.18)}`,
							opacity: 0.55,
						}}
					/>

					{/* Node cards */}
					{[
						{
							x: "10%",
							y: "22%",
							title: "Trigger",
							sub: "New request",
							c: colors.accent,
						},
						{
							x: "40%",
							y: "58%",
							title: "AI Step",
							sub: "Draft response",
							c: "#A78BFA",
						},
						{
							x: "70%",
							y: "22%",
							title: "Action",
							sub: "Send & log",
							c: colors.accent2,
						},
					].map((n, i) => (
						<div
							key={i}
							style={{
								position: "absolute",
								left: n.x,
								top: n.y,
								width: "22%",
								minWidth: 170,
								transform: "translate(-10%, -10%)",
								borderRadius: 16,
								border: "1px solid rgba(245,247,255,0.10)",
								background:
									"linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.03) 100%)",
								boxShadow: "0 18px 55px rgba(0,0,0,0.35)",
								padding: 14,
							}}
						>
							<div
								style={{
									display: "flex",
									alignItems: "center",
									gap: 10,
								}}
							>
								<div
									style={{
										width: 10,
										height: 10,
										borderRadius: 10,
										background: n.c,
										boxShadow: `0 0 0 6px ${rgba(n.c, 0.16)}`,
									}}
								/>
								<div
									style={{
										color: "rgba(245,247,255,0.86)",
										fontWeight: 800,
										letterSpacing: -0.3,
										fontSize: 14,
									}}
								>
									{n.title}
								</div>
							</div>
							<div
								style={{
									marginTop: 6,
									color: "rgba(245,247,255,0.62)",
									fontWeight: 600,
									fontSize: 13,
									lineHeight: 1.2,
								}}
							>
								{n.sub}
							</div>
						</div>
					))}
				</div>
			</div>
		</AbsoluteFill>
	);
};

const AIWorkflowBuilderDemo: React.FC = () => {
	return (
		<AbsoluteFill style={{ fontFamily: FONT_FAMILY }}>
			<Background />
			<Sequence from={0} durationInFrames={210}>
				<IntroTitle />
				<WorkflowHint />
			</Sequence>
		</AbsoluteFill>
	);
};

export default AIWorkflowBuilderDemo;