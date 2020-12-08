

// index.html 관련 함수

function showSamAddCard() {
    $('#sam-add-card').show();
}

function hideSamAddCard() {
    $('#sam-add-card').hide();
    $('#sam-add-card input').val('');
}

// sam 저장, 수정, 삭제

function createSam() {
    let first = $("#sam-first").val();
    let second = $("#sam-second").val();
    let third = $("#sam-third").val();

    if (first == '' || second == '' || third == '') {
        alert('빈 칸을 채워주세요');
        return;
    }

    $.ajax({
        type: "POST",
        url: "/sam/create",
        data: {
            first_give: first,
            second_give: second,
            third_give: third,
            user_id_give: "user_id"
        },
        success: function (response) {
            if (response["result"] == "success") {
                alert("삼행시 추가!");
                window.location.reload();
            } else {
                alert("서버 오류!")
            }
        }
    })
}

function readSam() {
    $('#sam-list').empty();

    $.ajax({
        type: "GET",
        url: "/sam/read",
        data: {
        },
        success: function (response) {
            if (response['result'] == 'success') {
                let sams = response['sam_list']
                for (let i = sams.length-1; i >= 0; i--) {
                    let sam = sams[i]
                    $('#sam-list').append(makeSamCard(sam))
                }

            } else {
                alert("서버 오류!")
            }
        }
    })
}

function makeSamCard(sam){
    let id = sam['_id']
    let first = sam['first']
    let second = sam['second']
    let third = sam['third']
    let like_count = sam['like'].length

    let card = `
                <div class="card">
                    <div class="card-content">
                        <div class="sam-text">
                            <div>
                                <p>O : ${first}</p>
                            </div>
                            <div>
                                <p>O : ${second}</p>
                            </div>
                            <div>
                                <p>O : ${third}</p>
                            </div>
                            <div class="content-edit">
                               <span class="icon is-medium pointer" onclick="deleteSam('${id}')">
                                   <i class="fas fa-lg fa-times"></i>
                               </span>
                           </div>
                        </div>
                        <div>
                            <span class="icon is-medium pointer">
                                <i class="fas fa-lg fa-stamp"></i>
                            </span>
                            <p>${like_count}</p>
                        </div>
                    </div>
                </div>
               `
    return card
}

function deleteSam(id) {
    $.ajax({
        type: "POST",
        url: "/sam/delete",
        data: {
            id_give : id,
            user_id_give : "user_id"
        },
        success: function (response) {
            if (response["result"] == "success") {
                alert("삼행시 삭제!");
                window.location.reload();
            } else {
                alert("서버 오류!")
            }
        }
    })
}

function showRank(){
    $.ajax({
        type: "GET",
        url: "/rank/read",
        data: {
        },
        success: function (response) {
            if (response['result'] == 'success') {
                let sams = response['sam_list']
                for (let i = sams.length-1; i >= 0; i--) {
                    let sam = sams[i]
                    $('#sam-list').append(makeSamCard(sam))
                }

            } else {
                alert("서버 오류!")
            }
        }
    })
}