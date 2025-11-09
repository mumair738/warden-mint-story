import { Mic2, Wand2, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";

const narratorVoices = [
  {
    id: "degen",
    name: "The Degen",
    tagline: "Sarcastic, high-energy, and not afraid of risk",
    avatar: "🎮",
  },
  {
    id: "professor",
    name: "The Professor",
    tagline: "Analytical, educational, and precise",
    avatar: "🎓",
  },
  {
    id: "zen",
    name: "The Zen Master",
    tagline: "Calm, philosophical, and mindful",
    avatar: "🧘",
  },
];

const narrativeThemes = [
  {
    id: "cyberpunk",
    name: "Cyberpunk",
    example: "Your transaction cuts through the neon-lit blockchain like a data blade...",
  },
  {
    id: "fantasy",
    name: "Epic Fantasy",
    example: "You wielded your wallet like a legendary sword, slashing through the realm...",
  },
  {
    id: "sports",
    name: "Sports Center",
    example: "And he makes the swap! An incredible move on the DeFi field...",
  },
];

const Studio = () => {
  const [selectedVoice, setSelectedVoice] = useState("degen");
  const [selectedTheme, setSelectedTheme] = useState("cyberpunk");
  const [speed, setSpeed] = useState([50]);
  const [stability, setStability] = useState([50]);
  const [pitch, setPitch] = useState([50]);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-4xl font-bold bg-gradient-neon bg-clip-text text-transparent mb-2">
          Narrator Studio
        </h1>
        <p className="text-muted-foreground">
          Customize how your crypto stories are told
        </p>
      </div>

      {/* Voice Selection */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-lg font-semibold">
          <Mic2 className="h-5 w-5 text-primary" />
          <span>Choose Your Narrator Voice</span>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {narratorVoices.map((voice) => (
            <button
              key={voice.id}
              onClick={() => setSelectedVoice(voice.id)}
              className={`glass-card rounded-xl p-6 border transition-all text-left ${
                selectedVoice === voice.id
                  ? "border-primary shadow-[0_0_20px_rgba(0,240,255,0.4)]"
                  : "border-primary/20 hover:border-primary/40"
              }`}
            >
              <div className="text-4xl mb-3">{voice.avatar}</div>
              <h3 className="font-semibold mb-1">{voice.name}</h3>
              <p className="text-sm text-muted-foreground">{voice.tagline}</p>
              {selectedVoice === voice.id && (
                <div className="mt-3">
                  <div className="inline-flex items-center justify-center gap-2 w-full px-3 py-2 rounded-lg glass-card border border-primary/30 hover:border-primary/50 hover:bg-card/80 text-sm transition-all">
                    <Volume2 className="h-3 w-3" />
                    <span>Preview</span>
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Theme Selection */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-lg font-semibold">
          <Wand2 className="h-5 w-5 text-primary" />
          <span>Choose Your Narrative Theme</span>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {narrativeThemes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => setSelectedTheme(theme.id)}
              className={`glass-card rounded-xl p-6 border transition-all text-left ${
                selectedTheme === theme.id
                  ? "border-secondary shadow-[0_0_20px_rgba(255,0,255,0.4)]"
                  : "border-primary/20 hover:border-primary/40"
              }`}
            >
              <h3 className="font-semibold mb-2">{theme.name}</h3>
              <p className="text-sm text-muted-foreground italic">{theme.example}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Advanced Controls */}
      <div className="glass-card rounded-xl p-6 border border-primary/20 space-y-6">
        <h3 className="text-lg font-semibold">Advanced Voice Controls</h3>

        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Speed</span>
              <span className="text-muted-foreground">
                {speed[0] < 40 ? "Slow" : speed[0] > 60 ? "Fast" : "Normal"}
              </span>
            </div>
            <Slider
              value={speed}
              onValueChange={setSpeed}
              max={100}
              step={1}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Stability (Emotion)</span>
              <span className="text-muted-foreground">
                {stability[0] < 40 ? "Calm" : stability[0] > 60 ? "Expressive" : "Balanced"}
              </span>
            </div>
            <Slider
              value={stability}
              onValueChange={setStability}
              max={100}
              step={1}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Pitch</span>
              <span className="text-muted-foreground">
                {pitch[0] < 40 ? "Low" : pitch[0] > 60 ? "High" : "Medium"}
              </span>
            </div>
            <Slider
              value={pitch}
              onValueChange={setPitch}
              max={100}
              step={1}
              className="w-full"
            />
          </div>
        </div>

        <Button variant="glass" size="sm">
          Reset to Default
        </Button>
      </div>
    </div>
  );
};

export default Studio;
