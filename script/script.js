const saveIssue = (e) => {
    let issueDesc = document.getElementById("issueDescInput").value;
    let issueSeverity = document.getElementById("issueSeverInput").value;
    let issueAssigned = document.getElementById("issueAssignedInput").value;
    //for returning global identifier
    let issueId = chance.guid();
    //setting the status to string
    let issueStatus = "Open";

    const issue = {
        id: issueId,
        desc: issueDesc,
        severity: issueSeverity,
        status: issueStatus,
        assignedTo: issueAssigned
    }
    if (localStorage.getItem("issues") === null) {
        let issues = [];
        issues.push(issue);
        localStorage.setItem("issues", JSON.stringify(issues));
    } else {
        let issues = JSON.parse(localStorage.getItem("issues"));
        issues.push(issues);
        localStorage.setItem("issues", JSON.stringify(issues));
    }
    //it make sure that everything in the form is initialized and the values are removed
    document.getElementById("issueInputForm").reset();
    fetchIssue();
    e.preventDefault();
}
document.getElementById("issueInputForm").addEventListener("submit", saveIssue);
const fetchIssue = () => {
    let issues = JSON.parse(localStorage.getItem("issues"));
    let issueList = document.getElementById("issueList");
    issueList.innerHTML = "";

    for (let i = 0; i < issues.length; i++) {
        let id = issues[i].id;
        let desc = issues[i].desc;
        let assignedTo = issues[i].assignedTo;
        let severity = issues[i].severity;
        let status = issues[i].status;
        issueList.innerHTML += '<div class="well">' +
            '<h6> Issue Id:' + id + '</h6>' + '<p><span class="label label-info"></span>' + status +
            '</p>' + '<h3>' + desc + '</h3>' + '<p><span class="glyphicon glyphicon-time"></span>' + severity +
            '</p>' + '<p><span class="glyphicon glyphicon-time"></span>' + assignedTo + '</p>' +
            '<a href="#" class="btn btn-primary"onClick="setStatusClosed(\'' + id + '\')">Close</a>' +
            '<a href="#" class="btn btn-danger" onClick="deleteIssue(\'' + id + '\')">Delete</a>' + '</div>';

    }
}