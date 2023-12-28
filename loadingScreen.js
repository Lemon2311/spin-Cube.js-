export class LoadingScreen {
    constructor() {
        this.loadingScreen = this.document.createElement("div");
        this.loadingScreen.style.position = "fixed";
        this.loadingScreen.style.top = "0";
        this.loadingScreen.style.left = "0";
        this.loadingScreen.style.width = "100%";
        this.loadingScreen.style.height = "100%";
        this.loadingScreen.style.backgroundColor = "white";
        this.loadingScreen.style.display = "flex";
        this.loadingScreen.style.justifyContent = "center";
        this.loadingScreen.style.alignItems = "center";
        this.loadingScreen.style.zIndex = "9999";

        this.spinner = this.document.createElement("div");
        this.spinner.style.border = "4px solid rgba(0, 0, 0, 0.3)";
        this.spinner.style.borderTop = "4px solid #3498db";
        this.spinner.style.borderRadius = "50%";
        this.spinner.style.width = "40px";
        this.spinner.style.height = "40px";
        this.spinner.style.animation = "spin 1s linear infinite";

        this.loadingScreen.appendChild(this.spinner);

        // Define the CSS animation
        const style = this.document.createElement("style");
        style.innerHTML = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }`;
        this.document.head.appendChild(style);

        // Show the loading screen initially
        this.show();
    }

    show() {
        this.document.body.appendChild(this.loadingScreen);
    }

    hide() {
        this.loadingScreen.style.display = "none";
    }

    simulateLoading(delay) {
        setTimeout(() => {
            this.hide();
        }, delay);
    }

    // Method to hide the loading screen after JavaScript has loaded
    hideOnJsLoad() {
        this.document.defaultView.onload = () => {
            this.hide();
        };
    }
}

module.exports = LoadingScreen;