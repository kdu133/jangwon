function showsams() {
    $.ajax({
        type: "GET",
        url: "/sam/read",
        data: {},
        success: function (response) {
            let sams = response["sam_list"];
            console.log(sams);
            for (let i=0; i<sams.length; i++) {
                makesam(sams[i]["id"], sams[i]["first"], sams[i]["second"], sams[i]["third"], sams[i]["date"], sams[i]["like"], sams[i]["user_id"]);
            }
        }
    })
}

function makesam(id, first, second, third, date, like, user_id) {
    let tempHtml = `<div className="column">
                    <div className="box notification is-danger">
                  <span className="title1 has-text-info">
                      <span>삼</span>
                  </span>
                        <span className="level1 is-size-5">
                      <span>${first}</span>
                  </span>
                        <br></br>
                        <span className="title2 has-text-info">
                      <span>행</span>
                  </span>
                        <span className="level2 is-size-5">
                      <span>${second}</span>
                  </span>
                        <br></br>
                        <span className="title3 has-text-info">
                      <span>시</span>
                  </span>
                        <span className="level3 is-size-5">
                      <span>${third}</span>
                  </span>
                        <br></br>
                        <span className="level-item">
                    <span className="icon is-small"><i className="fas fa-heart"></i></span>
                  </span>
                        <div className="level-right is-size-4">
                            ${date}
                        </div></div>`;
    $("#my-sam-list").append(tempHtml);
}