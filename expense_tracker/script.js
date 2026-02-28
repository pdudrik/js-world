function validateData(data) {
    let errors = [];

    if (isNaN(new Date(data["date"]))) {
        errors.push("Entered date is invalid");
    }
    if (data["name"] < 2) {
        errors.push("Entered name is too short");
    }
    if (!data["value"] || !isFinite(data["value"])) {
        errors.push("Entered value is invalid");
    }

    return errors;
}


function saveRecord(data) {
    let records = sessionStorage.getItem("records");
    if (records === null) {
        records = [];
    }
    else {
        records = JSON.parse(records);
    }
    records.push(data);
    sessionStorage.setItem("records", JSON.stringify(records));
}

function getNewRecordID() {
    let id = sessionStorage.getItem("lastRecordID");
    if (id) {
        id = parseInt(id) + 1;
        id = id.toString();
    }
    else {
        id = "1";
    }

    sessionStorage.setItem("lastRecordID", id);
    return "item_" + id;
}


function deleteRecord(recordID) {
    let records = sessionStorage.getItem("records");
    if (!records) {
        return;
    }

    records = JSON.parse(records);
    console.log(records);
    for (let i=0; i<records.length; i++) {
        if (records[i]["id"] == recordID) {
            console.log("MATCH")
            records.splice(i, 1);
        }
    }
    console.log(records);

    sessionStorage.setItem("records", JSON.stringify(records));
    document.getElementById(recordID).remove();
}


function updateTable(records) {
    let table = document.getElementById("table");
    
    for (let i=0; i<records.length; i++) {
        let row = table.insertRow();
        row.id = records[i].id;

        let date = row.insertCell()
        let name = row.insertCell()
        let value = row.insertCell()
        let options = row.insertCell()

        date.classList.add("table-cell");
        name.classList.add("table-cell");
        value.classList.add("table-cell");
        options.classList.add("table-cell", "delete-icon");

        // let img = document.createElement("img");
        // img.src = "delete.svg";
        // img.width = 35;
        // img.height = 35;
        // img.alt = "X";
        // img.addEventListener("click", function () {
        //     console.log("Delete record: " + records[i].id);
        //     deleteRecord(records[i].id);
        // });

        let svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svgElement.setAttribute("width", "35px");
        svgElement.setAttribute("height", "35px");
        svgElement.setAttribute("viewBox", "0 0 100 100");
        // svgElement.setAttribute("xmlns", "http://www.w3.org/2000/svg");

        let pathElement1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
        pathElement1.setAttribute("fill", "#f37e98");
        pathElement1.setAttribute('d', "M25,30l3.645,47.383C28.845,79.988,31.017,82,33.63,82h32.74c2.613,0,4.785-2.012,4.985-4.617L75,30");

        
        let pathElement2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
        // pathElement1.fill = "#f37e98";
        // pathElement1.d = "M25,30l3.645,47.383C28.845,79.988,31.017,82,33.63,82h32.74c2.613,0,4.785-2.012,4.985-4.617L75,30";
        pathElement2.setAttribute("fill", "#f15b6c");
        pathElement2.setAttribute("d", "M65 38v35c0 1.65-1.35 3-3 3s-3-1.35-3-3V38c0-1.65 1.35-3 3-3S65 36.35 65 38zM53 38v35c0 1.65-1.35 3-3 3s-3-1.35-3-3V38c0-1.65 1.35-3 3-3S53 36.35 53 38zM41 38v35c0 1.65-1.35 3-3 3s-3-1.35-3-3V38c0-1.65 1.35-3 3-3S41 36.35 41 38zM77 24h-4l-1.835-3.058C70.442 19.737 69.14 19 67.735 19h-35.47c-1.405 0-2.707.737-3.43 1.942L27 24h-4c-1.657 0-3 1.343-3 3s1.343 3 3 3h54c1.657 0 3-1.343 3-3S78.657 24 77 24z");

        let pathElement3 = document.createElementNS("http://www.w3.org/2000/svg", "path");
        pathElement3.setAttribute("fill", "#1f212b");
        pathElement3.setAttribute("d", "M66.37 83H33.63c-3.116 0-5.744-2.434-5.982-5.54l-3.645-47.383 1.994-.154 3.645 47.384C29.801 79.378 31.553 81 33.63 81H66.37c2.077 0 3.829-1.622 3.988-3.692l3.645-47.385 1.994.154-3.645 47.384C72.113 80.566 69.485 83 66.37 83zM56 20c-.552 0-1-.447-1-1v-3c0-.552-.449-1-1-1h-8c-.551 0-1 .448-1 1v3c0 .553-.448 1-1 1s-1-.447-1-1v-3c0-1.654 1.346-3 3-3h8c1.654 0 3 1.346 3 3v3C57 19.553 56.552 20 56 20z");

        // let pathElement2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
        // pathElement2.setAttribute("fill", "#1f212b");
        // pathElement2.setAttribute("d", "M66.37 83H33.63c-3.116 0-5.744-2.434-5.982-5.54l-3.645-47.383 1.994-.154 3.645 47.384C29.801 79.378 31.553 81 33.63 81H66.37c2.077 0 3.829-1.622 3.988-3.692l3.645-47.385 1.994.154-3.645 47.384C72.113 80.566 69.485 83 66.37 83zM56 20c-.552 0-1-.447-1-1v-3c0-.552-.449-1-1-1h-8c-.551 0-1 .448-1 1v3c0 .553-.448 1-1 1s-1-.447-1-1v-3c0-1.654 1.346-3 3-3h8c1.654 0 3 1.346 3 3v3C57 19.553 56.552 20 56 20z");

        let pathElement4 = document.createElementNS("http://www.w3.org/2000/svg", "path");
        pathElement4.setAttribute("fill", "#1f212b");
        pathElement4.setAttribute("d", "M77,31H23c-2.206,0-4-1.794-4-4s1.794-4,4-4h3.434l1.543-2.572C28.875,18.931,30.518,18,32.265,18h35.471c1.747,0,3.389,0.931,4.287,2.428L73.566,23H77c2.206,0,4,1.794,4,4S79.206,31,77,31z M23,25c-1.103,0-2,0.897-2,2s0.897,2,2,2h54c1.103,0,2-0.897,2-2s-0.897-2-2-2h-4c-0.351,0-0.677-0.185-0.857-0.485l-1.835-3.058C69.769,20.559,68.783,20,67.735,20H32.265c-1.048,0-2.033,0.559-2.572,1.457l-1.835,3.058C27.677,24.815,27.351,25,27,25H23z");

        let pathElement5 = document.createElementNS("http://www.w3.org/2000/svg", "path");
        pathElement5.setAttribute("fill", "#1f212b");
        pathElement5.setAttribute("d", "M61.5 25h-36c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h36c.276 0 .5.224.5.5S61.776 25 61.5 25zM73.5 25h-5c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h5c.276 0 .5.224.5.5S73.776 25 73.5 25zM66.5 25h-2c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h2c.276 0 .5.224.5.5S66.776 25 66.5 25zM50 76c-1.654 0-3-1.346-3-3V38c0-1.654 1.346-3 3-3s3 1.346 3 3v25.5c0 .276-.224.5-.5.5S52 63.776 52 63.5V38c0-1.103-.897-2-2-2s-2 .897-2 2v35c0 1.103.897 2 2 2s2-.897 2-2v-3.5c0-.276.224-.5.5-.5s.5.224.5.5V73C53 74.654 51.654 76 50 76zM62 76c-1.654 0-3-1.346-3-3V47.5c0-.276.224-.5.5-.5s.5.224.5.5V73c0 1.103.897 2 2 2s2-.897 2-2V38c0-1.103-.897-2-2-2s-2 .897-2 2v1.5c0 .276-.224.5-.5.5S59 39.776 59 39.5V38c0-1.654 1.346-3 3-3s3 1.346 3 3v35C65 74.654 63.654 76 62 76z");
        
        let pathElement6 = document.createElementNS("http://www.w3.org/2000/svg", "path");
        pathElement6.setAttribute("fill", "#1f212b");
        pathElement6.setAttribute("d", "M59.5 45c-.276 0-.5-.224-.5-.5v-2c0-.276.224-.5.5-.5s.5.224.5.5v2C60 44.776 59.776 45 59.5 45zM38 76c-1.654 0-3-1.346-3-3V38c0-1.654 1.346-3 3-3s3 1.346 3 3v35C41 74.654 39.654 76 38 76zM38 36c-1.103 0-2 .897-2 2v35c0 1.103.897 2 2 2s2-.897 2-2V38C40 36.897 39.103 36 38 36z");
        
        
        svgElement.appendChild(pathElement1);
        svgElement.appendChild(pathElement2);
        svgElement.appendChild(pathElement3);
        svgElement.appendChild(pathElement4);
        svgElement.appendChild(pathElement5);
        svgElement.appendChild(pathElement6);

        svgElement.querySelectorAll("path").forEach(function(path) {
            path.setAttribute("fill", "currentColor");
        });
        // svgElement.classList.add("trash-icon");

        date.innerHTML = records[i]["date"];
        name.innerHTML = records[i]["name"];
        value.innerHTML = "<span class='value'>" + records[i]["value"] + "</span> EUR"
        options.appendChild(svgElement);
        
    }
}


function clearTable() {
    let table = document.getElementById("table");
    while (table.children.length > 1) {
        table.removeChild(table.children[1]);
    }
}


function handleSubmit(event) {
    event.preventDefault();

    let form = event.target;
    let formData = new FormData(form);
    let record = {};

    for (var pair of formData.entries()) {
        record[pair[0]] = pair[1];
    }
    
    record["id"] = getNewRecordID();
    record["value"] = Number(record["value"]);
    let errors = validateData(record);
    if (errors.length > 0) {
        alert("Invalid input: \n" + errors);
        return;
    }

    saveRecord(record);

    let records = sessionStorage.getItem("records");
    if (records) {
        clearTable();
        updateTable(JSON.parse(records));
    }
}

let records = sessionStorage.getItem("records");
if (records) {
    updateTable(JSON.parse(records));
}

document.getElementById("form").onsubmit = handleSubmit;