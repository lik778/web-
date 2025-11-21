
import { Destination } from "./types";

export const DESTINATIONS: Destination[] = [
  {
    id: "mars",
    name: "火星 (Mars)",
    type: "类地行星",
    distance: "0.0000158 光年",
    description: "红色星球。奥林帕斯山的故乡，拥有太阳系最大的火山。是人类殖民的首选目标。",
    color: "text-red-500 border-red-500 shadow-red-500/50",
    imagePlaceholder: "https://upload.wikimedia.org/wikipedia/commons/0/02/OSIRIS_Mars_true_color.jpg"
  },
  {
    id: "europa",
    name: "木卫二 (Europa)",
    type: "冰卫星",
    distance: "0.0000665 光年",
    description: "表面覆盖着厚厚的冰层，冰层下可能存在着巨大的液态海洋，孕育着生命的希望。",
    color: "text-blue-300 border-blue-300 shadow-blue-300/50",
    imagePlaceholder: "https://upload.wikimedia.org/wikipedia/commons/e/e4/Europa-moon-with-margin.jpg"
  },
  {
    id: "titan",
    name: "土卫六 (Titan)",
    type: "卫星",
    distance: "0.00015 光年",
    description: "拥有浓厚的大气层和液态甲烷湖泊。这颗奇异的卫星与早期的地球惊人地相似。",
    color: "text-yellow-500 border-yellow-500 shadow-yellow-500/50",
    imagePlaceholder: "https://upload.wikimedia.org/wikipedia/commons/d/d8/Titan_mosaic_full.jpg"
  },
  {
    id: "proxima_b",
    name: "比邻星 b (Proxima b)",
    type: "系外行星",
    distance: "4.24 光年",
    description: "离我们最近的系外行星，位于宜居带内。它是我们恒星际旅行的第一站。",
    color: "text-purple-400 border-purple-400 shadow-purple-400/50",
    imagePlaceholder: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Exoplanet_Phase_Curve_Interpretation.jpg/1280px-Exoplanet_Phase_Curve_Interpretation.jpg"
  },
  {
    id: "kepler_186f",
    name: "开普勒-186f",
    type: "超级地球",
    distance: "582 光年",
    description: "第一颗在宜居带发现的地球大小的行星。它的红矮星太阳赋予了它永恒的黄昏。",
    color: "text-emerald-400 border-emerald-400 shadow-emerald-400/50",
    imagePlaceholder: "https://upload.wikimedia.org/wikipedia/commons/5/59/Kepler-186f_artist_concept.jpg"
  },
  {
    id: "blackhole_cygnus",
    name: "天鹅座 X-1",
    type: "黑洞",
    distance: "6070 光年",
    description: "一个能够吞噬光线的引力奇点。这里不仅是物理法则的边界，也是勇气的试炼场。",
    color: "text-gray-200 border-gray-500 shadow-white/30",
    imagePlaceholder: "blackhole"
  }
];
