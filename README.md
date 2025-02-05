# Password Security Checker

![Password Security Checker](https://passwordslab.netlify.app/logo.png)

Password Security Checker is an advanced tool designed to analyze the strength of your passwords. It provides real-time crack-time estimates, entropy scores, and risk evaluations to help you improve your password security. All processing is done client-side, ensuring complete privacy and security.

## Features

- **Real-Time Analysis**: Get instant feedback on your password strength as you type.
- **Entropy Calculation**: Measures the randomness and complexity of your password.
- **Crack Time Estimation**: Estimates how long it would take to crack your password using various methods.
- **Security Tips**: Provides actionable recommendations to improve your password strength.
- **Dark Mode**: Toggle between light and dark themes for better user experience.
- **Client-Side Processing**: All password analysis is performed locally in your browser, ensuring your passwords never leave your device.

## Project Structure

### [`index.html`](Password_Security_Checker/index.html)

The main HTML file that structures the web page. It includes meta tags for SEO, links to external stylesheets and scripts, and the main content of the page.

### [`script.js`](Password_Security_Checker/script.js)

Contains the JavaScript code that handles the password strength analysis, theme toggling, and modal interactions. It uses the [zxcvbn](https://github.com/dropbox/zxcvbn) library for password strength estimation.

### [`styles.css`](Password_Security_Checker/styles.css)

Defines the styles for the web page, including themes, layout, and responsiveness. It uses CSS variables for easy theme management and includes styles for various components like the navbar, password checker, and feature cards.

## How to Use

1. **Clone the repository**:
    ```sh
    git clone https://github.com/ReyhanHussain/passwordslab.git
    ```

2. **Open the project**:
    Navigate to the project directory and open the [index.html](http://_vscodecontentref_/1) file in your browser.

3. **Analyze Password**:
    Enter your password in the input field to get real-time feedback on its strength, crack time, and entropy score.

4. **Toggle Theme**:
    Click the theme toggle button in the navbar to switch between light and dark modes.

## Dependencies

- [zxcvbn](https://github.com/dropbox/zxcvbn): A password strength estimator used for analyzing password strength.
- [Font Awesome](https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css): Provides icons used throughout the project.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## Contact

For any questions or feedback, please contact [Reyhan](mailto:reyhanbgscet@outlook.com).

---

Thank you for using Password Security Checker! We hope it helps you create stronger, more secure passwords.
