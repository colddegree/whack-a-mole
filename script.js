const hitboxContainerOuterHTML =
    `<svg class="hitbox-container" width="133.03mm" height="149.76mm" viewBox="0 -149.76 133.03 149.76">
        <g class="hitbox" transform="translate(-3.2e-8 106.34)">
            <ellipse cx="39.337" cy="-22.74" rx="30.51" ry="27.604" stroke-width=".2679"/>
            <ellipse cx="93.13" cy="-22.914" rx="30.576" ry="27.938" stroke-width=".26981"/>
            <ellipse cx="66.874" cy="-1.1438" rx="18.461" ry="17" stroke-width=".28748"/>
          <ellipse cx="66.356" cy="-50.901" rx="37.44" ry="32.601" stroke-width=".56342"/>
        </g>
    </svg>`;

const moleClasses = [
    "builder-mole",
    "nerd-mole",
    "pirate-mole"
];

const easeDuration = .25;
const easeAfterBeingCaughtDuration = .1;
const easeType = Power1.easeInOut;

let cells = document.getElementsByClassName("cell");
let moles = new Array(3*4);

let scoreElement = document.getElementById("score");
let score = 0;

(function initMoles() {
    for (let i = 0; i < cells.length; i++) {
        let mole = document.createElement("div");
        let moleClass = moleClasses[getRandomInt(0, moleClasses.length - 1)];
        mole.classList.add(moleClass);
        cells[i].appendChild(mole);

        let hitboxContainer = document.createElement("svg");
        cells[i].appendChild(hitboxContainer);
        hitboxContainer.outerHTML = hitboxContainerOuterHTML;

        hitboxContainer = cells[i].querySelector(".hitbox-container");

        moles[i] = {
            mole: mole,
            hitboxContainer: hitboxContainer,
            hitbox: hitboxContainer.querySelector(".hitbox")
        };
        
        moles[i].hitbox.addEventListener("click", () => {
            hideMole(moles[i], easeAfterBeingCaughtDuration);
            score++;
            updateScore();
        });
    }
})();


const intervalMilliseconds = easeDuration * 1000 * 3;

setInterval(() => {
    let idx = getRandomInt(0, moles.length - 1);
    showMole(moles[idx]);
    setTimeout(() => {
        hideMole(moles[idx]);
    }, intervalMilliseconds * getRandomArbitrary(0.5, 2));
}, intervalMilliseconds);


function showMole(mole, duration = easeDuration) {
    TweenMax.to(mole.mole, duration, {
        backgroundPositionY: "0vmin",
        ease: easeType
    });
    TweenMax.to(mole.hitboxContainer, duration, {
        attr: {
            viewBox: "0 0 133.03 149.76"
        },
        ease: easeType
    });
}

function hideMole(mole, duration = easeDuration) {
    TweenMax.to(mole.mole, duration, {
        backgroundPositionY: "18vmin",
        ease: easeType
    });
    TweenMax.to(mole.hitboxContainer, duration, {
        attr: {
            viewBox: "0 -149.76 133.03 149.76"
        },
        ease: easeType,
    });
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function updateScore() {
    scoreElement.querySelector("p").textContent = "Score: " + score;
}