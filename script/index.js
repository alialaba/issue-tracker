const saveIssue = (e) => {
    let issueDesc = document.getElementById("issueDescInput").value;
    let issueSeverity = document.getElementById("issueSeverInput").value;
    let issueAssigned = document.getElementById("issueAssignedInput").value;
    //for returning global identifier
    let issueId = chance.guid();
    let issueStatus = "Open";

    let issue = {
        id: issueId,
        desc: issueDesc,
        severity: issueSeverity,
        assignedTo: issueAssigned,
        status: issueStatus
    }
    if (localStorage.getItem("issues") == null) {
        let issues = [];
        issues.push(issue);
        localStorage.setItem("issues", JSON.stringify(issues));
    } else {
        let issues = JSON.parse(localStorage.getItem("issues"));
        issues.push(issue);
        localStorage.setItem("issues", JSON.stringify(issues))
    }
    //it make sure that everything in the form is initialized and the values are removed
    document.getElementById("issueInputForm").reset();
    fetchIssue();
    e.preventDefault()
}


const setStatusClosed = (id) => {
    let issues = JSON.parse(localStorage.getItem("issues"));
    for (let i = 0; i < issues.length; i++) {
        if (issues[i].id === id) {
            issues[i].status = "closed"
        }
    }
    localStorage.setItem("issues", JSON.stringify(issues));
    fetchIssue();
}

const deleteIssue = (id) => {
    let issues = JSON.parse(localStorage.getItem("issues"));
    for (let i = 0; i < issues.length; i++) {
        if (issues[i].id === id) {
            //removing an item from a array;
            issues.splice(i, 1)
        }
    }
    localStorage.setItem("issues", JSON.stringify(issues));
    fetchIssue();
}

const fetchIssue = () => {
    let issues = JSON.parse(localStorage.getItem("issues"));
    let issueList = document.getElementById("issueList");
    issueList.innerHTML = "";
    for (let i = 0; i < issues.length; i++) {

        let id = issues[i].id;
        let severity = issues[i].severity;
        let desc = issues[i].desc;
        let assignedTo = issues[i].assignedTo;
        let status = issues[i].status;
        issueList.innerHTML += '<div class="jumbotron">' +
            '<h6> Issue Id:' + id + '</h6>' + '<p><span class="badge badge-primary">' + status + '</span></p>' +
            '<h3>' + desc + '</h3>' + '<p><span class="glyphicon glyphicon-time"></span>' + severity +
            '<p><span class="glyphicon glyphicon-user">' + assignedTo + '</p>' + '</p>' +
            '<a href="#" class="btn btn-primary"onClick="setStatusClosed(\'' + id + '\')">Close</a>' +
            '<a href="#" class="btn btn-danger" onClick="deleteIssue(\'' + id + '\')">Delete</a>' + '</div>';
        // console.log(issues[i])
    }

}
document.getElementById("issueInputForm").addEventListener("submit", saveIssue)