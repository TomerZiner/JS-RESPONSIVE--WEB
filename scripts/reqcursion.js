function generateFibonacci(n) {
    if (n <= 0) return [];
    if (n === 1) return [0];
    if (n === 2) return [0, 1];
    const prev = generateFibonacci(n - 1);
    const next = prev[prev.length - 1] + prev[prev.length - 2];
    return [...prev, next];
  }
  
  document.getElementById("fibBtn").addEventListener("click", () => {
    const n = parseInt(document.getElementById("fibInput").value);
    const resultDiv = document.getElementById("fibResult");
    if (isNaN(n) || n < 0) {
      resultDiv.innerText = "נא להכניס מספר שלם חיובי";
      return;
    }
    const fibSeries = generateFibonacci(n);
    resultDiv.innerText = fibSeries.join(", ");
  });
  

  
  const canvas = document.getElementById("triangleCanvas");
  const ctx = canvas.getContext("2d");
  

  function drawTriangle(ctx, x, y, size) {
    const height = size * Math.sqrt(3) / 2;
    ctx.beginPath();

    ctx.moveTo(x - size / 2, y);
    ctx.lineTo(x + size / 2, y);
    ctx.lineTo(x, y - height);
    ctx.closePath();
    ctx.stroke();
  }
  

  function drawRecursiveTriangles(ctx, x, y, size, depth) {
    if (depth < 0) return;
    
    // צייר את המשולש הנוכחי
    drawTriangle(ctx, x, y, size);
    
    if (depth === 0) return;
    
    const height = size * Math.sqrt(3) / 2;

    const xLeft = x - size / 4;
    const yLeft = y;
    

    const xRight = x + size / 4;
    const yRight = y;
    

    const xTop = x;
    const yTop = y - height / 2;
    

    drawRecursiveTriangles(ctx, xLeft, yLeft, size / 2, depth - 1);
    drawRecursiveTriangles(ctx, xRight, yRight, size / 2, depth - 1);
    drawRecursiveTriangles(ctx, xTop, yTop, size / 2, depth - 1);
  }
  

  function updateTriangles() {
    const size = parseInt(document.getElementById("triangleSize").value);
    const depth = parseInt(document.getElementById("triangleDepth").value);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const x = canvas.width / 2;
    const y = canvas.height - 20; 
    drawRecursiveTriangles(ctx, x, y, size, depth);
  }
  
  document.getElementById("triangleSize").addEventListener("input", updateTriangles);
  document.getElementById("triangleDepth").addEventListener("input", updateTriangles);
  
  updateTriangles();