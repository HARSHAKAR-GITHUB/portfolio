# Harsh Akar — Portfolio

Personal cybersecurity & application security portfolio: `Curiosity, code, and controlled chaos.`  
Built with **Next.js 16 (App Router)** + **TypeScript** + **Tailwind CSS v4** + **Framer Motion** + **Lucide Icons** + **Web Audio API**.

---

## 🚀 Run Locally

```bash
npm install
npm run dev
# → http://localhost:3000
```

To test the production static export locally:

```bash
npm run build
# Creates optimized static output in /out
```

---

## 🛠️ Features & Sections

- **01 / ABOUT**: Professional identity, corporate VAPT analyst background, and operational methodology.
- **02 / CREDENTIALS**: 6 industry certifications (CEH, CySA+, Sec+, Malware Analyst, Net+, Linux+) with holographic verified badges and global CTF/offensive labs leaderboard (TryHackMe Top 2%, HackTheBox 814th).
- **03 / WORK**: Flagship mobile and communication applications with defense-in-depth architecture, plus open-source security utilities (WAFDETECTOR, Encoder_decoder, AutoMailer-Pro).
- **04 / TOOLKIT**: Multi-category interactive skills accordion covering Web/API pentesting, Mobile instrumentation (Frida, MobSF), Wazuh SIEM operations, and AI security.
- **05 / LAB**: Playable interactive arcade with Packet Runner (firewall evasion), Cryptographic Memory Decryption (Wordle-style hex cracker with audio synthesis and hint telemetry), and Port Telemetry Radar Scanner.
- **06 / JOURNEY**: Career roadmap spanning corporate security engineering, Bugcrowd research, and degree specialization.
- **07 / NOW**: Real-time research radar covering LLM application security, runtime instrumentation, and custom detection engineering.
- **08 / CONTACT**: Direct email channel (`harshakar.official@gmail.com`) with one-click copy and verified terminal session card.
- **RESUME DOWNLOAD**: Uiverse.io-inspired animated gem button serving `Harsh_Akar_Resume.pdf`.

---

## 🌐 GitHub Pages Deployment

Deployment is 100% automated via GitHub Actions on push to `main` ([`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)).

Configured in [`next.config.ts`](next.config.ts) with `output: "export"` and dynamic `basePath` resolution for both root and subpath GitHub Pages URLs.
