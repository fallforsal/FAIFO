// lib/shaders/rainTransition.ts
// Rain shader — solid cream base, no texture dependency
// Original by Martijn Steinrucken (BigWings) — CC BY-NC-SA 3.0

export const rainVertexShader = /* glsl */ `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

export const rainFragmentShader = /* glsl */ `
precision highp float;

uniform float iTime;
uniform vec2 iResolution;
uniform float fadeProgress;

varying vec2 vUv;

#define S(a, b, t) smoothstep(a, b, t)

vec3 N13(float p) {
  vec3 p3 = fract(vec3(p) * vec3(0.1031, 0.11369, 0.13787));
  p3 += dot(p3, p3.yzx + 19.19);
  return fract(vec3((p3.x + p3.y) * p3.z, (p3.x + p3.z) * p3.y, (p3.y + p3.z) * p3.x));
}

float N(float t) {
  return fract(sin(t * 12345.564) * 7658.76);
}

float Saw(float b, float t) {
  return S(0.0, b, t) * S(1.0, b, t);
}

vec2 DropLayer2(vec2 uv, float t) {
  vec2 UV = uv;
  uv.y += t * 0.75;
  vec2 a = vec2(6.0, 1.0);
  vec2 grid = a * 2.0;
  vec2 id = floor(uv * grid);
  float colShift = N(id.x);
  uv.y += colShift;
  id = floor(uv * grid);
  vec3 n = N13(id.x * 35.2 + id.y * 2376.1);
  vec2 st = fract(uv * grid) - vec2(0.5, 0.0);
  float x = n.x - 0.5;
  float y = UV.y * 20.0;
  float wiggle = sin(y + sin(y));
  x += wiggle * (0.5 - abs(x)) * (n.z - 0.5);
  x *= 0.7;
  float ti = fract(t + n.z);
  y = (Saw(0.85, ti) - 0.5) * 0.9 + 0.5;
  vec2 p = vec2(x, y);
  float d = length((st - p) * a.yx);
  float mainDrop = S(0.4, 0.0, d);
  float r = sqrt(S(1.0, y, st.y));
  float cd = abs(st.x - x);
  float trail = S(0.23 * r, 0.15 * r * r, cd);
  float trailFront = S(-0.02, 0.02, st.y - y);
  trail *= trailFront * r * r;
  y = UV.y;
  float trail2 = S(0.2 * r, 0.0, cd);
  float droplets = max(0.0, (sin(y * (1.0 - y) * 120.0) - st.y)) * trail2 * trailFront * n.z;
  y = fract(y * 10.0) + (st.y - 0.5);
  float dd = length(st - vec2(x, y));
  droplets = S(0.3, 0.0, dd);
  float m = mainDrop + droplets * r * trailFront;
  return vec2(m, trail);
}

float StaticDrops(vec2 uv, float t) {
  uv *= 40.0;
  vec2 id = floor(uv);
  uv = fract(uv) - 0.5;
  vec3 n = N13(id.x * 107.45 + id.y * 3543.654);
  vec2 p = (n.xy - 0.5) * 0.7;
  float d = length(uv - p);
  float fade = Saw(0.025, fract(t + n.z));
  float c = S(0.3, 0.0, d) * fract(n.z * 10.0) * fade;
  return c;
}

vec2 Drops(vec2 uv, float t, float l0, float l1, float l2) {
  float s = StaticDrops(uv, t) * l0;
  vec2 m1 = DropLayer2(uv, t) * l1;
  vec2 m2 = DropLayer2(uv * 1.85, t) * l2;
  float c = s + m1.x + m2.x;
  c = S(0.3, 1.0, c);
  return vec2(c, max(m1.y * l0, m2.y * l1));
}

void main() {
    vec2 fragCoord = vUv * iResolution;
    vec2 uv = (fragCoord.xy - .5 * iResolution.xy) / iResolution.y;
    
    float T = iTime;
    float t = T * 0.25;
    
    // Mưa đọng lại
    float rainAmount = smoothstep(0.0, 3.0, T) * 0.8;
    
    float staticDrops = S(-.5, 1., rainAmount) * 2.;
    float layer1 = S(.25, .75, rainAmount);
    float layer2 = S(.0, .5, rainAmount);
    vec2 c = Drops(uv, t, staticDrops, layer1, layer2);
    
    vec3 glassColor = vec3(0.96, 0.94, 0.90); // Nền màu kem
    
    // Sương mù che bình gốm lúc đầu (đục 80%)
    float fogAlpha = smoothstep(0.0, 3.0, T) * 0.8;
    
    // ==========================================
    // HIỆU ỨNG CẦN GẠT NƯỚC (WIPER EFFECT)
    // ==========================================
    // fadeProgress chạy từ 0.0 đến 1.0 (Nhận từ useFrame)
    // Cần gạt đi từ lề phải (1.2) sang mép trái (-0.2)
    float wiperX = 1.2 - fadeProgress * 1.4; 
    
    // Phân định ranh giới: 1.0 = Đã gạt (bên phải), 0.0 = Chưa gạt (bên trái)
    float wiped = smoothstep(wiperX - 0.05, wiperX + 0.05, vUv.x);
    
    // Giọt nước bị xóa sổ (nhân với 0) nếu nằm ở bên đã gạt
    float dropAlpha = clamp((c.x + c.y) * 3.0, 0.0, 1.0) * (1.0 - wiped);
    
    // Sau khi gạt đi qua, màn hình biến thành màu Kem đặc 100% (Alpha = 1.0)
    float finalAlpha = mix(fogAlpha, 1.0, wiped) + dropAlpha;
    
    // Tạo một vệt hằn mờ mờ ở mép cần gạt cho chân thực
    float wiperLine = smoothstep(wiperX + 0.02, wiperX, vUv.x) * smoothstep(wiperX - 0.02, wiperX, vUv.x);
    
    vec3 finalColor = mix(glassColor, vec3(0.6), c.x * 0.8 * (1.0 - wiped));
    finalColor -= wiperLine * 0.04; // Vệt gạt đổ bóng nhẹ
    
    gl_FragColor = vec4(finalColor, clamp(finalAlpha, 0.0, 1.0));
} 
`;