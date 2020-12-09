function showMySams() {
    $.ajax({
        type: "GET",
        url: "/sam/myread",
        data: {},
        success: function (response) {
            let mysams = response["mysam_list"];
            for (let i=0; i<mysams.length; i++) {
                makeMysam(mysams[i]);
            }
        }
    })
}

function makeMysam(mysam) {
    let id = mysam["id"]
    let first = mysam["first"]
    let second = mysam["second"]
    let third = mysam["third"]
    let date = mysam["date"]
    let like_cnt = mysam["like_cnt"]
    let user_id = mysam["user_id"]
    let keyword = getKeyword(date)

    let tempHtml = `<div class="box notification is-danger">
                        <div class="lines">
                                <span class="title1 has-text-info">
                                    <span>${keyword[0]}</span>
                                </span>
                            <span class="level1 is-size-5">
                                    <span>${first}</span>
                                </span>
                            <br></br>
                            <span class="title2 has-text-info">
                                    <span>${keyword[1]}</span>
                                </span>
                            <span class="level2 is-size-5">
                                    <span>${second}</span>
                                </span>
                            <br></br>
                            <span class="title3 has-text-info">
                                    <span>${keyword[2]}</span>
                                </span>
                            <span class="level3 is-size-5">
                                    <span>${third}</span>
                                </span>
                            <br></br>
                        </div>
                        <div class="likes">
                            <span class="level-item">
                                <span class="icon is-small"><i class="fas fa-heart"></i>${like_cnt}</span>
                            </span>
                        </div>
                        <div class="level-right is-size-4">
                            ${date}
                        </div>
                    </div>`
    $("#my-sam-list").append(tempHtml);
}