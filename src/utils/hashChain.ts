export function generateSimulatedHash(previousHash: string, dataString: string): string {
  // Deterministic mock SHA-256 generation for frontend demonstration
  let hash = 0;
  const combined = previousHash + dataString;
  for (let i = 0; i < combined.length; i++) {
    const char = combined.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0; // Convert to 32bit integer
  }
  
  // Create 64-character hex string simulation
  const hex1 = Math.abs(hash).toString(16).padStart(8, '0');
  const hex2 = Math.abs(hash ^ 0x5a5a5a5a).toString(16).padStart(8, '0');
  const hex3 = Math.abs((hash * 31) | 0).toString(16).padStart(8, '0');
  const hex4 = Math.abs((hash * 17) | 0).toString(16).padStart(8, '0');
  const hex5 = Math.abs((hash * 13) | 0).toString(16).padStart(8, '0');
  const hex6 = Math.abs((hash * 7) | 0).toString(16).padStart(8, '0');
  const hex7 = Math.abs((hash * 3) | 0).toString(16).padStart(8, '0');
  const hex8 = Math.abs((hash * 19) | 0).toString(16).padStart(8, '0');

  return (hex1 + hex2 + hex3 + hex4 + hex5 + hex6 + hex7 + hex8).slice(0, 64);
}

