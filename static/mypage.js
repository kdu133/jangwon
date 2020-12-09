function showsams() {
    $.ajax({
        type: "GET",
        url: "/sam/myread",
        data: {},
        success: function (response) {
            let mysams = response["mysam_list"];
            console.log(mysams);
            for (let i=0; i<mysams.length; i++) {
                print(mysams[i])
                makesam(mysams[i]["id"], mysams[i]["first"], mysams[i]["second"], mysams[i]["third"], mysams[i]["date"], mysams[i]["like_cnt"], mysams[i]["user_id"]);
            }
        }
    })
}

function makesam(id, first, second, third, date, like_cnt) {

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
                    <span>${like_cnt}</span> 
                  </span>
                        <div className="level-right is-size-4">
                            ${date}
                        </div></div>`;
    $("#my-sam-list").append(tempHtml);