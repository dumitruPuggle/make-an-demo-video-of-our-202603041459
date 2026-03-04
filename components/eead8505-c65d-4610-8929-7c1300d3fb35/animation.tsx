import React from "react";
import { AbsoluteFill } from "remotion";

const BgGrid: React.FC = () => {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background:
          "radial-gradient(1200px 700px at 50% 40%, rgba(41,55,118,0.35) 0%, rgba(8,10,26,0.95) 60%, rgba(6,7,18,1) 100%)",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          opacity: 0.35,
          filter: "blur(0px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(900px 450px at 50% 55%, rgba(107,74,220,0.18) 0%, rgba(0,0,0,0) 65%)",
          mixBlendMode: "screen",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(800px 420px at 78% 54%, rgba(197,168,71,0.12) 0%, rgba(0,0,0,0) 65%)",
          mixBlendMode: "screen",
        }}
      />
    </div>
  );
};

const IconPaperclip: React.FC<{ size?: number; color?: string }> = ({
  size = 22,
  color = "rgba(255,255,255,0.65)",
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M8.6 12.6l5.9-5.9a3.2 3.2 0 014.5 4.5l-7.4 7.4a5 5 0 01-7.1-7.1l7-7"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconMic: React.FC<{ size?: number; color?: string }> = ({
  size = 22,
  color = "rgba(255,255,255,0.65)",
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M12 14a3 3 0 003-3V7a3 3 0 10-6 0v4a3 3 0 003 3z"
      stroke={color}
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <path
      d="M19 11a7 7 0 01-14 0"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M12 18v3"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M8 21h8"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const IconSend: React.FC<{ size?: number; color?: string }> = ({
  size = 22,
  color = "rgba(255,255,255,0.65)",
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M3 11.5l18-8-7.5 18-2.4-7.2L3 11.5z"
      stroke={color}
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <path
      d="M10.9 14.3L21 3.5"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const AgentPill: React.FC<{
  label: string;
  active?: boolean;
  iconColor?: string;
  rightIcon?: React.ReactNode;
}> = ({ label, active = false, iconColor = "#a98cff", rightIcon }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "10px 16px",
        borderRadius: 999,
        border: "1px solid rgba(255,255,255,0.14)",
        background: active ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.10)",
        color: active ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.80)",
        fontSize: 20,
        letterSpacing: 0.2,
        lineHeight: 1,
        boxShadow: active ? "0 0 0 2px rgba(255,255,255,0.04) inset" : "none",
        whiteSpace: "nowrap",
      }}
    >
      <div
        style={{
          width: 26,
          height: 26,
          borderRadius: 999,
          background:
            "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.12) 35%, rgba(0,0,0,0.12) 100%), linear-gradient(135deg, rgba(122,85,255,0.55), rgba(227,192,97,0.45))",
          border: "1px solid rgba(255,255,255,0.20)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: 16,
            height: 16,
            borderRadius: 999,
            background: iconColor,
            opacity: 0.55,
            filter: "blur(0.2px)",
          }}
        />
      </div>
      <div style={{ opacity: active ? 1 : 0.85 }}>{label}</div>
      {rightIcon ? (
        <div style={{ marginLeft: 4, display: "flex", alignItems: "center" }}>
          {rightIcon}
        </div>
      ) : null}
    </div>
  );
};

const SmallCircleButton: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <div
    style={{
      width: 54,
      height: 54,
      borderRadius: 999,
      background: "rgba(255,255,255,0.06)",
      border: "1px solid rgba(255,255,255,0.10)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0 10px 22px rgba(0,0,0,0.35)",
    }}
  >
    {children}
  </div>
);

const SampleCard: React.FC<{ text: string }> = ({ text }) => (
  <div
    style={{
      width: 300,
      height: 185,
      borderRadius: 10,
      border: "1px solid rgba(255,255,255,0.18)",
      background: "rgba(255,255,255,0.03)",
      boxShadow: "0 18px 40px rgba(0,0,0,0.38)",
      padding: 24,
      color: "rgba(255,255,255,0.90)",
      fontSize: 22,
      lineHeight: 1.35,
      letterSpacing: 0.2,
    }}
  >
    {text}
  </div>
);

const ChevronDown: React.FC<{ size?: number; color?: string }> = ({
  size = 30,
  color = "rgba(255,255,255,0.92)",
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M7 10l5 5 5-5"
      stroke={color}
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const AgentSwarmBuildScreen: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        width: 1600,
        height: 900,
        fontFamily:
          'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif',
        backgroundColor: "#07081a",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <BgGrid />

      <div
        style={{
          position: "absolute",
          top: 130,
          left: 0,
          right: 0,
          textAlign: "center",
          color: "white",
          fontSize: 92,
          fontWeight: 800,
          letterSpacing: -1.2,
          textShadow: "0 18px 40px rgba(0,0,0,0.55)",
        }}
      >
        What should we build?
      </div>

      <div
        style={{
          position: "absolute",
          top: 290,
          left: 160,
          right: 160,
          height: 250,
          borderRadius: 22,
          background: "rgba(255,255,255,0.05)",
          boxShadow: "0 26px 60px rgba(0,0,0,0.55)",
          border: "6px solid transparent",
          backgroundClip: "padding-box",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 290,
          left: 160,
          right: 160,
          height: 250,
          borderRadius: 22,
          padding: 6,
          background:
            "linear-gradient(90deg, rgba(141,85,255,1) 0%, rgba(160,130,255,0.55) 35%, rgba(227,192,97,0.95) 100%)",
          opacity: 0.75,
          filter: "blur(0px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 296,
          left: 166,
          right: 166,
          height: 238,
          borderRadius: 18,
          background:
            "linear-gradient(180deg, rgba(27,33,70,0.70) 0%, rgba(21,24,55,0.72) 100%)",
          border: "1px solid rgba(255,255,255,0.10)",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 26,
            top: 26,
            color: "rgba(210,220,235,0.40)",
            fontSize: 26,
            letterSpacing: 0.2,
          }}
        >
          Ask Agent Swarm to create an AI sales assistant...
        </div>

        <div style={{ position: "absolute", left: 26, bottom: 30 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "14px 22px",
              borderRadius: 999,
              background:
                "linear-gradient(90deg, rgba(122,85,255,0.65) 0%, rgba(227,192,97,0.55) 100%)",
              boxShadow: "0 12px 26px rgba(0,0,0,0.35)",
              border: "1px solid rgba(255,255,255,0.16)",
              color: "rgba(255,255,255,0.92)",
              fontSize: 22,
              letterSpacing: 0.2,
            }}
          >
            <div
              style={{
                width: 26,
                height: 26,
                borderRadius: 999,
                background:
                  "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.10) 55%, rgba(0,0,0,0.10) 100%)",
                border: "1px solid rgba(255,255,255,0.20)",
              }}
            />
            <div style={{ fontWeight: 500 }}>Agent Swarm</div>
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            right: 22,
            bottom: 26,
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <SmallCircleButton>
            <IconPaperclip />
          </SmallCircleButton>
          <SmallCircleButton>
            <IconMic />
          </SmallCircleButton>

          <div
            style={{
              width: 190,
              height: 62,
              borderRadius: 999,
              background: "rgba(255,255,255,0.10)",
              border: "1px solid rgba(255,255,255,0.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              paddingLeft: 26,
              paddingRight: 16,
              boxShadow: "0 16px 32px rgba(0,0,0,0.35)",
            }}
          >
            <div
              style={{
                color: "rgba(255,255,255,0.45)",
                fontSize: 22,
                fontWeight: 600,
              }}
            >
              Send
            </div>
            <IconSend />
          </div>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          top: 565,
          left: 255,
          right: 255,
          display: "flex",
          justifyContent: "center",
          gap: 22,
        }}
      >
        <AgentPill label="Agent Swarm" active={false} />
        <AgentPill label="General Agent" active />
        <AgentPill label="Slides Agent" active />
        <AgentPill label="Deep Research Agent" active />
      </div>

      <div
        style={{
          position: "absolute",
          top: 635,
          left: 250,
          right: 250,
          display: "flex",
          justifyContent: "center",
          gap: 22,
        }}
      >
        <AgentPill label="Data Analyst" active />
        <AgentPill label="Docs Agent" active />
        <AgentPill label="Video Agent" active />
        <AgentPill label="Image Agent" active />
        <AgentPill
          label="Build Your Own"
          active
          rightIcon={
            <div
              style={{
                width: 18,
                height: 18,
                borderRadius: 4,
                background: "rgba(255,255,255,0.16)",
                transform: "rotate(45deg)",
              }}
            />
          }
        />
      </div>

      <div
        style={{
          position: "absolute",
          top: 710,
          left: 210,
          color: "rgba(255,255,255,0.55)",
          fontSize: 26,
          fontWeight: 600,
          letterSpacing: 0.2,
        }}
      >
        Sample prompts
      </div>

      <div
        style={{
          position: "absolute",
          top: 760,
          left: 210,
          right: 210,
          display: "flex",
          gap: 22,
        }}
      >
        <SampleCard text={"What can this agency\ndo?"} />
        <SampleCard
          text={
            "Build a full launch\npackage: research,\nslides, docs, and\ncreative assets."
          }
        />
        <SampleCard
          text={
            "Analyze my data and\nthen turn insights into\na polished executive\ndeck."
          }
        />
        <SampleCard
          text={
            "Coordinate a\nworkflow for proposal\ndoc + promo visuals +\nshort product video."
          }
        />
      </div>

      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 26,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: 999,
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.12)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 18px 40px rgba(0,0,0,0.55)",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <ChevronDown size={28} />
            <ChevronDown size={28} />
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};