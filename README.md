# XSnare
A Firefox extension to protect against XSS.

## Usage: 
### As an user:
Go to `about:debugging` in the Firefox browser.
Go to **This Firefox -> Load Temporary Add-on** and point to `dom_firewall_firefox/background.js`.
XSnare will now automatically analyse sites you visit and will filter out exploits on sites for which a signature has been defined.

### As a signature developer:
Add signatures by modifying `sigs.js`
Mainframe signatures (`main_frame_signatures`) are used to analyze the main loaded site. 
Add signatures to their respective framework (e.g. WordPress), or in `'generic'` if no framework is available.
Signatures can be tested and debugged by using the **Inspect** option in `about:debugging` in Firefox. This will
open a tab with the extension's background page code.


### Running exploit Docker containers:
Studied CVEs are included in `wordpress_exploits` (some examples may contain sveral CVEs).
Each of these has a Docker container which will install WordPress along with the related plugin.
`docker-compose up` to start the container.

### Running evaluation:
The `selenium-test` folder contains several evaluation suites for different purposes, e.g. testing wordpress sites (wordpress_tests_interleaved), 
testing popular sites (top_500_tests_interleaved), with and without extension, and so on. These can be run with Node.JS, all rerquired files 
should be included in the repository.
