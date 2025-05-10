const elts = {
          text1: document.getElementById("text1"),
          text2: document.getElementById("text2")
      };
      
      const texts = [
          "In the summer of 2024, I was returning back to the US from my internship abroad",
          " An hour before landing in Washington Dulles, the flight attendant hands me a tray",
          "A curly pasta adorned with bright orange salmon; a puffy ciabatta roll; a yellow-green double-decker cake",
          "I looked over to the mousse-like dessert, enjoying a bite",
          "I reach down for seconds but suddenly feel my esophagus closing",
          "The screen flickers",
          "I look at the flight tracker",
          " I look at the flight tracker"," 30 minutes left"," I count down the minutes"," 20"," I want to get off this tube of doom"," 10"," Despite my significant preparations, I fell victim to my kryptonite","Since age 2, I have been diagnosed with a nut allergy, my kryptonite"," Bakery goods, which most kids love, are forbidden for me"," As a formerly introverted child, my allergy forced me to adapt and speak my needs to people who can help","  After many international flights, I learned the importance of notifying the airline catering desk of my allergies"," I always need to call ahead of time, notifying them of the allergy, then double-check with the check-in desk and flight attendants"," Despite doing these exact actions before boarding, this time, it did not work","  I was lucky my episode passed, and I did not have serious consequences","Despite this not being the only time I have succumbed to my allergies, this reiterates an important idea I hold dear"," Just like how I cannot change my allergies, other kids cannot change their race, gender, or physical limitations, yet get shunned for these exact reasons"," Through my experiences, especially on this flight, I have realized that communication and advocacy are the tools to break down barriers"," In the future, I envision helping other students to speak up for themselves"," No one should be discriminated against for an issue they cannot control"

      ];
      
      const morphTime = 1;
      const cooldownTime = 3;
      
      let textIndex = texts.length - 1;
      let time = new Date();
      let morph = 0;
      let cooldown = cooldownTime;
      
      elts.text1.textContent = texts[textIndex % texts.length];
      elts.text2.textContent = texts[(textIndex + 1) % texts.length];
      
      function doMorph() {
          morph -= cooldown;
          cooldown = 0;
      
          let fraction = morph / morphTime;
      
          if (fraction > 1) {
              cooldown = cooldownTime;
              fraction = 1;
          }
      
          setMorph(fraction);
      }
      
      function setMorph(fraction) {
          elts.text2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
          elts.text2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;
      
          fraction = 1 - fraction;
          elts.text1.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
          elts.text1.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;
      
          elts.text1.textContent = texts[textIndex % texts.length];
          elts.text2.textContent = texts[(textIndex + 1) % texts.length];
      }
      
      function doCooldown() {
          morph = 0;
      
          elts.text2.style.filter = "";
          elts.text2.style.opacity = "100%";
          elts.text2.style.color = "white";
      
          elts.text1.style.filter = "";
          elts.text1.style.opacity = "0%";
          elts.text1.style.color = "white";
      }
      
      function animate() {
          requestAnimationFrame(animate);
      
          let newTime = new Date();
          let shouldIncrementIndex = cooldown > 0;
          let dt = (newTime - time) / 1000;
          time = newTime;
      
          cooldown -= dt;
      
          if (cooldown <= 0) {
              if (shouldIncrementIndex) {
                  textIndex++;
              }
      
              doMorph();
          } else {
              doCooldown();
          }
      }
      
      animate();
      