// פונקציה רקורסיבית ליצירת סדרת פיבונאצ'י עד n איברים
function generateFibonacci(n) {
    if (n <= 0) return [];
    if (n === 1) return [0];
    if (n === 2) return [0, 1];
    // קבלת הסדרה עד n-1 איברים ושמיצוי האיבר הבא
    const prev = generateFibonacci(n - 1);
    const next = prev[prev.length - 1] + prev[prev.length - 2];
    return [...prev, next];
  }
  
  // אירוע לכפתור הפעלת סדרת פיבונאצ'י
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
  
  // ציור משולשים רקורסיבי על ה־Canvas
  
  const canvas = document.getElementById("triangleCanvas");
  const ctx = canvas.getContext("2d");
  
  // פונקציה לציור משולש עם מרכז תחתון ב-(x,y)
  function drawTriangle(ctx, x, y, size) {
    const height = size * Math.sqrt(3) / 2;
    ctx.beginPath();
    // קודקודים: תחתון שמאל, תחתון ימין, קודקוד עליון
    ctx.moveTo(x - size / 2, y);
    ctx.lineTo(x + size / 2, y);
    ctx.lineTo(x, y - height);
    ctx.closePath();
    ctx.stroke();
  }
  
  // פונקציה רקורסיבית לציור משולשים
  // הפרמטר depth מייצג את עומק הרקורסיה (מספר המשולשים)
  function drawRecursiveTriangles(ctx, x, y, size, depth) {
    if (depth < 0) return;
    
    // צייר את המשולש הנוכחי
    drawTriangle(ctx, x, y, size);
    
    if (depth === 0) return;
    
    const height = size * Math.sqrt(3) / 2;
    // חשבו את מיקומי המשולשים הקטנים:
    // משולש תחתון שמאל:
    const xLeft = x - size / 4;
    const yLeft = y;
    
    // משולש תחתון ימין:
    const xRight = x + size / 4;
    const yRight = y;
    
    // משולש עליון:
    const xTop = x;
    const yTop = y - height / 2;
    
    // קריאות רקורסיביות למשולשים קטנים עם גודל מחצית מהמשולש הנוכחי
    drawRecursiveTriangles(ctx, xLeft, yLeft, size / 2, depth - 1);
    drawRecursiveTriangles(ctx, xRight, yRight, size / 2, depth - 1);
    drawRecursiveTriangles(ctx, xTop, yTop, size / 2, depth - 1);
  }
  
  // פונקציה לעדכון ציור המשולשים על ה־Canvas
  function updateTriangles() {
    const size = parseInt(document.getElementById("triangleSize").value);
    const depth = parseInt(document.getElementById("triangleDepth").value);
    // נקה את ה־Canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // נתחיל לצייר את המשולשים במרכז התחתון של ה־Canvas
    const x = canvas.width / 2;
    const y = canvas.height - 20; // מרווח קטן מתחת
    drawRecursiveTriangles(ctx, x, y, size, depth);
  }
  
  // הוספת מאזינים לשינויי הסליידרים
  document.getElementById("triangleSize").addEventListener("input", updateTriangles);
  document.getElementById("triangleDepth").addEventListener("input", updateTriangles);
  
  // ציור התחלתי
  updateTriangles();