// ------
// This loads the JSON file containing references to currently archived branches and creates links to their folder and
// the HTML page containing their commit history
// -----

const branchLinksWrapper = document.getElementById("branch-links-wrapper");

// grab the JSON data - this kicks off the rest of the chain
async function loadLinkData(){
    try {
        const response = await fetch("./published-branches.json");
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const result = await response.json();
        createLinks(result.branches);
    } catch (error) {
        console.error(error.message);
    }
}

function createLinks(branchNames){
    branchNames.forEach((name) => {
        // create link to branch folder
        const newBranchLink = document.createElement("a");
        newBranchLink.textContent = name;
        newBranchLink.href = `/${name}`;
        branchLinksWrapper.appendChild(newBranchLink);
        // create link to branch commit history file
        const newHistoryLink = document.createElement("a");
        newHistoryLink.textContent = `${name} commit history`;
        newHistoryLink.href = `${name}-commit-history-page.html`;
        branchLinksWrapper.appendChild(newHistoryLink);
    });
}

loadLinkData();