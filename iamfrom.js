const elts = {
          text1: document.getElementById("text1"),
          text2: document.getElementById("text2")
      };
      
      const texts = [
          "I am from California",
          "I am from a cool winter day",
          "I am from the TV where we would watch Dora",
          "I am from the park next door, where we would go and play",
          "I am from the pressure cooker",
          "I am from stress",
          "I am from a place where you can’t be an onlooker",
          "I am from a place where you cannot transgress",
          "I am from the plane",
"I am from a constant move of travel",
"I am from a place where you never use the train",
"I am from a place where no one has held the gavel",
"I am from a place where my sister hugs a tree",
"I am from a place where my family has high expectations ",
"I am from a place where I will no longer be",
"I am from a place where I will never receive congratulations",
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
      