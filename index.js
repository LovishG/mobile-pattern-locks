let min = document.querySelector(".min");
      let max = document.querySelector(".max");
      const button = document.querySelector("button");
      const output = document.querySelector("p");
      let DOTS = 10;

      button.addEventListener("click", () => {
        let minVal = min.value;
        let maxVal = max.value;

        if (minVal > maxVal) {
          let swapVariable = minVal;
              minVal = maxVal;
              maxVal = swapVariable;
        }

        const patternsPossible = waysOfConnection(minVal, maxVal);
        output.innerHTML = `Total possible Patterns are = <strong>${patternsPossible}</strong>`;
        output.style.display = 'block';
        console.log(minVal, maxVal, patternsPossible);
      });

      
        function totalPatternFromCur(visit, jump, cur, toTouch) {
          if (toTouch <= 0) {
            return toTouch == 0 ? 1 : 0;
          }

          let ways = 0;

          visit[cur] = true;

          for (let i = 1; i < DOTS; i++) {
            if (!visit[i] && (jump[i][cur] == 0 || visit[jump[i][cur]]))
              ways += totalPatternFromCur(visit, jump, i, toTouch - 1);
          }
          visit[cur] = false;

          return ways;
        }

        function waysOfConnection(m, n) {
          let jump = new Array(DOTS);
          for (let i = 0; i < DOTS; i++) {
            jump[i] = new Array(DOTS);
            for (let j = 0; j < DOTS; j++) {
              jump[i][j] = 0;
            }
          }

          jump[1][3] = jump[3][1] = 2;

          jump[7][9] = jump[9][7] = 8;

          jump[1][7] = jump[7][1] = 4;

          jump[3][9] = jump[9][3] = 6;


            jump[1][9] =
            jump[9][1] =
            jump[2][8] =
            jump[8][2] =
            jump[3][7] =
            jump[7][3] =
            jump[4][6] =
            jump[6][4] =
              5;

          let visit = new Array(DOTS);
          let ways = 0;
          for (let i = m; i <= n; i++) {
            ways += 4 * totalPatternFromCur(visit, jump, 1, i - 1);

            ways += 4 * totalPatternFromCur(visit, jump, 2, i - 1);

            ways += totalPatternFromCur(visit, jump, 5, i - 1);
          }
          return ways;
        }