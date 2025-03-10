export function range(start: number, end: number, step = 1): number[] {
    if (step === 0) throw new Error("Step cannot be 0");
    if (!Number.isFinite(start) || !Number.isFinite(end) || !Number.isFinite(step)) {
      throw new TypeError("Arguments must be finite numbers");
    }
  
    const result: number[] = [];
    let current = start;
  
    if (step > 0) {
      while (current < end) {
        result.push(current);
        current += step;
      }
    } else {
      while (current > end) {
        result.push(current);
        current += step;
      }
    }
  
    return result;
  }