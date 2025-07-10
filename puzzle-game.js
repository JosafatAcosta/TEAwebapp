// Enhanced Stress vs Anxiety Puzzle Game - DSM-5-TR
// Enhanced complexity with randomization and more cards

document.addEventListener('DOMContentLoaded', function() {
    // Game Variables
    let currentPlayer = 1;
    let score = 0;
    let timeLeft = 480; // 8 minutes in seconds
    let timer;
    let stagesCompleted = [false, false, false, false];
    let hintsUsed = [0, 0, 0, 0]; // hints used per stage
    let currentStage = 1;
    
    // Enhanced card data with more DSM-5-TR criteria
    const stageData = {
        1: {
            pieces: [
                { id: 'piece1-1', text: 'Síntomas aparecen inmediatamente tras evento estresante específico', category: 'stress' },
                { id: 'piece1-2', text: 'Preocupación excesiva la mayoría de días por ≥6 meses sin causa clara', category: 'anxiety' },
                { id: 'piece1-3', text: 'Disminuye cuando se resuelve la situación estresante', category: 'stress' },
                { id: 'piece1-4', text: 'Miedo intenso a situaciones sociales con evaluación negativa', category: 'anxiety' },
                { id: 'piece1-5', text: 'Alteraciones del sueño con despertar frecuente', category: 'both' },
                { id: 'piece1-6', text: 'Ataques de pánico inesperados recurrentes ≥1 mes', category: 'anxiety' },
                { id: 'piece1-7', text: 'Respuesta inmediata lucha-huida ante amenaza real', category: 'stress' },
                { id: 'piece1-8', text: 'Evitación persistente de estímulos relacionados con trauma', category: 'anxiety' },
                { id: 'piece1-9', text: 'Irritabilidad y dificultad para concentrarse', category: 'both' },
                { id: 'piece1-10', text: 'Síntomas persisten >6 meses sin estresor identificable', category: 'anxiety' },
                { id: 'piece1-11', text: 'Tensión muscular y fatiga por activación sostenida', category: 'both' },
                { id: 'piece1-12', text: 'Respuesta adaptativa a evento vital significativo', category: 'stress' }
            ],
            hints: [
                'Los síntomas de estrés agudo tienen relación temporal directa con el estresor',
                'Los trastornos de ansiedad persisten independientemente del estresor inicial',
                'Algunos síntomas pueden aparecer en ambas condiciones pero con diferente duración'
            ]
        },
        2: {
            pieces: [
                { id: 'piece2-1', text: 'Reviviscencia del trauma, evitación, hiperactivación ≥1 mes + deterioro funcional', category: 'ptsd' },
                { id: 'piece2-2', text: 'Preocupación excesiva ≥6 meses + ≥3 síntomas: inquietud, fatiga, concentración', category: 'gad' },
                { id: 'piece2-3', text: 'Ataques de pánico inesperados recurrentes + preocupación persistente ≥1 mes', category: 'panic' },
                { id: 'piece2-4', text: 'Miedo marcado ≥6 meses a situaciones sociales por evaluación negativa', category: 'social' },
                { id: 'piece2-5', text: 'Síntomas emocionales en respuesta a estresor identificable <3 meses', category: 'adjustment' },
                { id: 'piece2-6', text: 'Miedo a ≥2 situaciones: espacios abiertos, transporte, multitudes ≥6 meses', category: 'agoraphobia' },
                { id: 'piece2-7', text: 'Miedo excesivo a separación de figuras de apego ≥4 semanas (niños)', category: 'separation' },
                { id: 'piece2-8', text: 'Miedo marcado a objeto/situación específica ≥6 meses con evitación', category: 'specific' },
                { id: 'piece2-9', text: 'Alteraciones cognitivas negativas sobre uno mismo/mundo tras trauma', category: 'ptsd' },
                { id: 'piece2-10', text: 'Dificultad para controlar preocupación + tensión muscular persistente', category: 'gad' },
                { id: 'piece2-11', text: 'Sensaciones corporales catastróficas interpretadas como amenaza', category: 'panic' },
                { id: 'piece2-12', text: 'Rubor, temblor, sudoración en situaciones de exposición social', category: 'social' },
                { id: 'piece2-13', text: 'Síntomas no cumplen criterios para otro trastorno mental específico', category: 'adjustment' },
                { id: 'piece2-14', text: 'Necesidad de compañía o lugares "seguros" para funcionar', category: 'agoraphobia' }
            ],
            hints: [
                'TEPT requiere exposición a trauma y cluster específico de síntomas ≥1 mes',
                'TAG se caracteriza por preocupación excesiva generalizada ≥6 meses',
                'Los criterios temporales son cruciales para el diagnóstico diferencial'
            ]
        },
        3: {
            pieces: [
                { id: 'piece3-1', text: 'Veterano con pesadillas recurrentes, evitación + depresión mayor comórbida', category: 'ptsd-complex' },
                { id: 'piece3-2', text: 'Ejecutivo con preocupación constante por rendimiento + abuso de alcohol', category: 'gad-severe' },
                { id: 'piece3-3', text: 'Mujer con ataques de pánico + evitación de centros comerciales y transporte', category: 'panic-agoraphobia' },
                { id: 'piece3-4', text: 'Adolescente que evita escuela por miedo a presentaciones + ideación suicida', category: 'social-severe' },
                { id: 'piece3-5', text: 'Paciente con síntomas múltiples: pánico, preocupación generalizada + fobias', category: 'mixed-anxiety' },
                { id: 'piece3-6', text: 'Refugiado con síntomas 2 meses post-migración: ¿estrés adaptativo o TEPT?', category: 'adjustment-ptsd' },
                { id: 'piece3-7', text: 'Sobreviviente de accidente con flashbacks + síntomas disociativos graves', category: 'ptsd-complex' },
                { id: 'piece3-8', text: 'Madre con preocupación excesiva por hijos + ataques de pánico ocasionales', category: 'gad-severe' },
                { id: 'piece3-9', text: 'Hombre con ataques de pánico nocturnos + agorafobia sin historia de trauma', category: 'panic-agoraphobia' },
                { id: 'piece3-10', text: 'Estudiante con ansiedad social generalizada + trastorno de alimentación', category: 'social-severe' },
                { id: 'piece3-11', text: 'Paciente con síntomas de ansiedad + depresión sin predominio claro', category: 'mixed-anxiety' },
                { id: 'piece3-12', text: 'Víctima de violencia doméstica: síntomas <6 meses, ¿cuál es el diagnóstico?', category: 'adjustment-ptsd' }
            ],
            hints: [
                'En casos complejos, considera comorbilidades y severidad funcional',
                'El tiempo desde el trauma es crucial para diferenciar adaptativo vs TEPT',
                'Los síntomas mixtos requieren identificar el trastorno predominante'
            ]
        },
        4: {
            pieces: [
                { id: 'piece4-1', text: 'Paciente con ideación suicida activa + TEPT severo requiere estabilización inmediata', category: 'crisis' },
                { id: 'piece4-2', text: 'Joven con ansiedad social que prefiere evitar medicación + motivación alta', category: 'psychotherapy' },
                { id: 'piece4-3', text: 'TAG severo con síntomas somáticos incapacitantes + fracaso terapéutico previo', category: 'medication' },
                { id: 'piece4-4', text: 'TEPT crónico + depresión mayor + abuso sustancias requiere enfoque integral', category: 'combined' },
                { id: 'piece4-5', text: 'Profesional sanitario con burnout + síntomas ansiosos subclínicos', category: 'prevention' },
                { id: 'piece4-6', text: 'Paciente con síntomas psicóticos + ansiedad severa + diagnóstico incierto', category: 'referral' },
                { id: 'piece4-7', text: 'Adolescente con primer episodio de pánico + descompensación académica grave', category: 'crisis' },
                { id: 'piece4-8', text: 'Adulto mayor con agorafobia + motivación para terapia de exposición', category: 'psychotherapy' },
                { id: 'piece4-9', text: 'Embarazada con TAG severo + contraindicación psicoterapéutica temporalmente', category: 'medication' },
                { id: 'piece4-10', text: 'TEPT complejo resistente + trastorno límite de personalidad comórbido', category: 'combined' },
                { id: 'piece4-11', text: 'Trabajador de emergencias con síntomas subclínicos post-evento crítico', category: 'prevention' },
                { id: 'piece4-12', text: 'Paciente con síntomas graves + múltiples hospitalizaciones + resistencia tratamiento', category: 'referral' }
            ],
            hints: [
                'La seguridad del paciente es siempre la prioridad en crisis',
                'Considera preferencias del paciente y contraindicaciones',
                'Los casos complejos o refractarios requieren especialización'
            ]
        }
    };

    // DOM Elements
    const timeEl = document.getElementById('time');
    const scoreEl = document.getElementById('score');
    const nextBtn = document.getElementById('nextBtn');
    const hintBtn = document.getElementById('hintBtn');
    const restartBtn = document.getElementById('restartBtn');
    const shuffleBtn = document.getElementById('shuffleBtn');
    const installBtn = document.getElementById('installBtn');

    // Initialize game
    initializeGame();

    function initializeGame() {
        startTimer();
        loadStage(1);
        updatePlayerDisplay();
        
        // Event listeners
        nextBtn.addEventListener('click', nextStage);
        hintBtn.addEventListener('click', giveHint);
        restartBtn.addEventListener('click', restartGame);
        shuffleBtn.addEventListener('click', shuffleCurrentStage);
        
        // PWA install
        setupPWA();
    }

    function startTimer() {
        timer = setInterval(() => {
            timeLeft--;
            updateTimerDisplay();
            
            if (timeLeft <= 0) {
                clearInterval(timer);
                endGame();
            }
        }, 1000);
    }

    function updateTimerDisplay() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timeEl.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        if (timeLeft <= 120) { // Last 2 minutes
            timeEl.style.background = 'rgba(231, 76, 60, 0.9)';
            timeEl.style.animation = 'pulse 1s infinite';
        }
    }

    function loadStage(stageNum) {
        // Hide all stages
        for (let i = 1; i <= 4; i++) {
            const stage = document.getElementById(`stage${i}`);
            if (stage) stage.classList.add('hidden');
        }
        
        // Show current stage
        const currentStageEl = document.getElementById(`stage${stageNum}`);
        if (currentStageEl) {
            currentStageEl.classList.remove('hidden');
            currentStage = stageNum;
            updateStageProgress();
            generatePuzzlePieces(stageNum);
            updateHintDisplay(stageNum);
        }
    }

    function updateStageProgress() {
        for (let i = 1; i <= 4; i++) {
            const indicator = document.getElementById(`indicator-${i}`);
            if (indicator) {
                indicator.classList.remove('active', 'completed');
                if (i < currentStage) {
                    indicator.classList.add('completed');
                } else if (i === currentStage) {
                    indicator.classList.add('active');
                }
            }
        }
    }

    function generatePuzzlePieces(stageNum) {
        const container = document.getElementById(`pieces-container${stageNum}`);
        if (!container) return;

        container.innerHTML = '';
        const pieces = [...stageData[stageNum].pieces]; // Copy array
        shuffleArray(pieces); // Randomize order

        pieces.forEach((piece, index) => {
            const pieceEl = document.createElement('div');
            pieceEl.id = piece.id;
            pieceEl.className = 'puzzle-piece';
            pieceEl.draggable = true;
            pieceEl.setAttribute('data-category', piece.category);
            pieceEl.textContent = piece.text;
            
            // Add drag event listeners
            pieceEl.addEventListener('dragstart', dragStart);
            pieceEl.addEventListener('dragend', dragEnd);
            
            container.appendChild(pieceEl);
        });

        // Update pieces remaining counter
        updatePiecesRemaining(stageNum, pieces.length);

        // Setup drop zones for this stage
        setupDropZones(stageNum);
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function setupDropZones(stageNum) {
        // Get all drop zones for current stage
        const dropZones = document.querySelectorAll('.drop-zone');
        dropZones.forEach(zone => {
            zone.addEventListener('dragover', dragOver);
            zone.addEventListener('dragenter', dragEnter);
            zone.addEventListener('dragleave', dragLeave);
            zone.addEventListener('drop', (e) => drop(e, stageNum));
        });
    }

    function dragStart(e) {
        e.dataTransfer.setData('text/plain', e.target.id);
        setTimeout(() => {
            e.target.classList.add('dragging');
        }, 0);
    }

    function dragEnd(e) {
        e.target.classList.remove('dragging');
    }

    function dragOver(e) {
        e.preventDefault();
    }

    function dragEnter(e) {
        e.preventDefault();
        if (e.target.classList.contains('drop-zone')) {
            e.target.classList.add('highlight');
        }
    }

    function dragLeave(e) {
        if (e.target.classList.contains('drop-zone')) {
            e.target.classList.remove('highlight');
        }
    }

    function drop(e, stageNum) {
        e.preventDefault();
        const dropZone = e.target.closest('.drop-zone');
        if (!dropZone) return;
        
        dropZone.classList.remove('highlight');
        
        const pieceId = e.dataTransfer.getData('text/plain');
        const draggedPiece = document.getElementById(pieceId);
        
        if (!draggedPiece) return;
        
        const pieceCategory = draggedPiece.getAttribute('data-category');
        const zoneCategory = dropZone.getAttribute('data-category');
        const isCorrect = pieceCategory === zoneCategory;
        
        if (isCorrect) {
            // Correct placement
            handleCorrectPlacement(draggedPiece, dropZone, stageNum);
        } else {
            // Incorrect placement
            handleIncorrectPlacement(draggedPiece, stageNum);
        }
    }

    function handleCorrectPlacement(piece, dropZone, stageNum) {
        // Move piece to drop zone
        dropZone.appendChild(piece);
        piece.classList.remove('dragging');
        piece.setAttribute('draggable', 'false');
        piece.style.background = 'linear-gradient(135deg, #d5f5e3, #a8e6cf)';
        piece.style.border = '3px solid #27ae60';
        
        // Show positive feedback
        showFeedback(`¡Excelente! +${getPoints(stageNum)} puntos`, 'correct', stageNum);
        updateScore(getPoints(stageNum));
        
        // Switch player
        switchPlayer(stageNum);
        
        // Update pieces remaining
        const remainingPieces = document.querySelectorAll(`#pieces-container${stageNum} .puzzle-piece[draggable="true"]`).length;
        updatePiecesRemaining(stageNum, remainingPieces);
        
        // Check if stage is completed
        checkStageCompletion(stageNum);
    }

    function handleIncorrectPlacement(piece, stageNum) {
        piece.classList.add('incorrect');
        setTimeout(() => {
            piece.classList.remove('incorrect');
        }, 600);
        
        showFeedback(`Incorrecto. -${Math.floor(getPoints(stageNum)/2)} puntos. ¡Intenta de nuevo!`, 'incorrect', stageNum);
        updateScore(-Math.floor(getPoints(stageNum)/2));
    }

    function getPoints(stageNum) {
        const pointsPerStage = [25, 35, 50, 75]; // Increasing points per stage
        return pointsPerStage[stageNum - 1] || 25;
    }

    function switchPlayer(stageNum) {
        currentPlayer = currentPlayer === 1 ? 2 : 1;
        updatePlayerDisplay(stageNum);
    }

    function updatePlayerDisplay(stageNum = currentStage) {
        // Update player indicators for current stage
        const player1El = document.getElementById(`player1${stageNum > 1 ? '-s' + stageNum : ''}`);
        const player2El = document.getElementById(`player2${stageNum > 1 ? '-s' + stageNum : ''}`);
        
        if (player1El && player2El) {
            if (currentPlayer === 1) {
                player1El.classList.add('active');
                player2El.classList.remove('active');
            } else {
                player1El.classList.remove('active');
                player2El.classList.add('active');
            }
        }
    }

    function showFeedback(message, type, stageNum) {
        const feedbackEl = document.getElementById(`feedback${stageNum}`);
        if (feedbackEl) {
            feedbackEl.textContent = message;
            feedbackEl.className = 'feedback ' + type + '-feedback';
            
            setTimeout(() => {
                feedbackEl.textContent = '';
                feedbackEl.className = 'feedback';
            }, 4000);
        }
    }

    function updateScore(points) {
        score += points;
        scoreEl.textContent = score;
    }

    function updatePiecesRemaining(stageNum, count) {
        const counterEl = document.getElementById(`pieces-remaining${stageNum}`);
        if (counterEl) {
            counterEl.textContent = count;
        }
    }

    function updateHintDisplay(stageNum) {
        const hintsEl = document.getElementById(`hints-remaining${stageNum}`);
        if (hintsEl) {
            hintsEl.textContent = 3 - hintsUsed[stageNum - 1];
        }
    }

    function checkStageCompletion(stageNum) {
        const remainingPieces = document.querySelectorAll(`#pieces-container${stageNum} .puzzle-piece[draggable="true"]`);
        
        if (remainingPieces.length === 0) {
            stagesCompleted[stageNum - 1] = true;
            const bonusPoints = 50 + (stageNum * 25); // Increasing bonus per stage
            showFeedback(`🎉 ¡Etapa ${stageNum} completada! +${bonusPoints} puntos de bono`, 'correct', stageNum);
            updateScore(bonusPoints);
            
            if (stageNum < 4) {
                nextBtn.disabled = false;
                nextBtn.classList.remove('hidden');
                nextBtn.textContent = `Ir a Etapa ${stageNum + 1} 🚀`;
            } else {
                nextBtn.textContent = 'Ver Resumen Final 🏆';
                nextBtn.disabled = false;
                nextBtn.classList.remove('hidden');
            }
            
            updateStageProgress();
        }
    }

    function nextStage() {
        if (currentStage < 4) {
            loadStage(currentStage + 1);
            nextBtn.disabled = true;
            nextBtn.classList.add('hidden');
        } else {
            showSummary();
        }
    }

    function giveHint() {
        const stageIndex = currentStage - 1;
        
        if (hintsUsed[stageIndex] >= 3) {
            showFeedback('❌ No quedan pistas disponibles para esta etapa', 'incorrect', currentStage);
            return;
        }
        
        const hint = stageData[currentStage].hints[hintsUsed[stageIndex]];
        showFeedback(`💡 Pista: ${hint}`, 'correct', currentStage);
        
        hintsUsed[stageIndex]++;
        updateHintDisplay(currentStage);
        updateScore(-10); // Penalty for using hints
    }

    function shuffleCurrentStage() {
        generatePuzzlePieces(currentStage);
        showFeedback('🎲 ¡Cartas mezcladas aleatoriamente!', 'correct', currentStage);
    }

    function restartGame() {
        // Reset all variables
        currentPlayer = 1;
        score = 0;
        timeLeft = 480;
        stagesCompleted = [false, false, false, false];
        hintsUsed = [0, 0, 0, 0];
        currentStage = 1;
        
        // Clear timer
        if (timer) clearInterval(timer);
        
        // Update displays
        scoreEl.textContent = '0';
        nextBtn.classList.add('hidden');
        nextBtn.disabled = true;
        
        // Hide summary
        document.getElementById('summary').classList.add('hidden');
        
        // Restart
        initializeGame();
        
        showFeedback('🔄 Juego reiniciado. ¡A jugar!', 'correct', 1);
    }

    function showSummary() {
        // Hide current stage
        document.getElementById(`stage${currentStage}`).classList.add('hidden');
        
        // Show summary
        const summary = document.getElementById('summary');
        summary.classList.remove('hidden');
        
        // Hide buttons
        nextBtn.classList.add('hidden');
        hintBtn.classList.add('hidden');
        shuffleBtn.classList.add('hidden');
        
        // Calculate final score and performance
        clearInterval(timer);
        const timeBonus = Math.max(0, timeLeft * 2); // Bonus for remaining time
        const finalScore = score + timeBonus;
        
        document.getElementById('final-score').textContent = `Puntaje Final: ${finalScore} puntos`;
        
        // Performance breakdown
        const performanceEl = document.getElementById('performance-breakdown');
        const totalHints = hintsUsed.reduce((a, b) => a + b, 0);
        const completionRate = stagesCompleted.filter(Boolean).length / 4 * 100;
        
        performanceEl.innerHTML = `
            <p>✅ <strong>Etapas completadas:</strong> ${stagesCompleted.filter(Boolean).length}/4 (${completionRate.toFixed(1)}%)</p>
            <p>💡 <strong>Pistas utilizadas:</strong> ${totalHints}/12</p>
            <p>⏱️ <strong>Tiempo restante:</strong> ${Math.floor(timeLeft/60)}:${(timeLeft%60).toString().padStart(2,'0')}</p>
            <p>🏆 <strong>Bono temporal:</strong> +${timeBonus} puntos</p>
            <p>📊 <strong>Rendimiento:</strong> ${getPerformanceLevel(finalScore)}</p>
        `;
    }

    function getPerformanceLevel(finalScore) {
        if (finalScore >= 1000) return '🥇 Experto Clínico';
        if (finalScore >= 800) return '🥈 Avanzado';
        if (finalScore >= 600) return '🥉 Intermedio';
        if (finalScore >= 400) return '📚 Principiante';
        return '🎯 Necesita práctica';
    }

    function endGame() {
        showFeedback('⏰ ¡Tiempo agotado! Juego terminado.', 'incorrect', currentStage);
        setTimeout(showSummary, 2000);
    }

    function setupPWA() {
        // PWA installation
        let deferredPrompt;
        
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            deferredPrompt = e;
            installBtn.style.display = 'inline-block';
        });
        
        installBtn.addEventListener('click', () => {
            if (deferredPrompt) {
                deferredPrompt.prompt();
                deferredPrompt.userChoice.then(() => {
                    installBtn.style.display = 'none';
                    deferredPrompt = null;
                });
            }
        });
    }

    // Add CSS animation for pulse effect
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
    `;
    document.head.appendChild(style);
});