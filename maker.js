/*
 * 하나의 경력사항에 들어가는 각 프로젝트 node elements(html 태그들)이 보관될 2차원 배열
 * ex)
 * project_array[0][0] => 1번째 경력사항의 1번째 프로젝트
 * project_array[0][1] => 1번째 경력사항의 2번째 프로젝트
 * project_array[2][2] => 3번째 경력사항의 3번째 프로젝트
 */
let project_array = [[]];

// 프로젝트 버튼 클릭했을 때 동작 함수
function showHistory(index, number) {
  // 2차원 배열의 현재 경력사항에서 버튼이랑 연결된 프로젝트 div 테이블 display 시키는 동작
  for (let i = 0; i < project_array[index].length; i++) {
    if (i === number) {
      project_array[index][i].className = "display-on";
      continue;
    }
    project_array[index][i].className = "display-off";
  }
}

// 프로젝트 버튼을 만드는 함수
function addProjectButton(index, root) {
  // 새로운 div element(html 태그) 생성
  const NEW_DIV = document.createElement("div");

  // 새로운 button element(html 태그) 생성
  const NEW_BUTTON = document.createElement("button");

  // 위에서 만든 버튼 클릭했을 때 동작 함수를 버튼 요소에 onclick으로 추가
  const NODE_NUMBER = project_array[index].length;
  NEW_BUTTON.setAttribute("onclick", `showHistory(${index},${NODE_NUMBER})`);

  // 버튼 보여지는 텍스트
  const BUTTON_CONTENT = document.createTextNode(
    `프로젝트-${Number(NODE_NUMBER) + 1}번`
  );

  // 버튼 내용을 버튼 요소에 담기
  NEW_BUTTON.appendChild(BUTTON_CONTENT);

  // 버튼 요소를 새로 만든 button div에 담기
  NEW_DIV.appendChild(NEW_BUTTON);

  // 지금 위치한 경력사항을 루트로 잡아, 섹션-1-왼쪽부분을 찾아 새로 만든 button div를 담기
  const CURRENT_DIV = root.getElementsByClassName("section-1-left")[0];
  CURRENT_DIV.appendChild(NEW_DIV);
}

// text노드 맨 위에 추가하는 함수
function addTextNode(type, target, value) {
  const newItem = document.createElement(type); // Create a <li> node
  const textnode = document.createTextNode(value); // Create a text node
  newItem.appendChild(textnode); // Append the text to <li>

  target.insertBefore(newItem, target.childNodes[0]); // Insert <li> before the first child of <ul>
}

// 하나의 프로젝트에서 정보 입력받는 div 만드는 함수
function addProjectInput(index, root) {
  // 위에 만들어놨던 "새 프로젝트 추가했을 때 입력받을 div 템플릿" 복제하기
  const NEW_PROJECT_HISTORY = document.getElementsByClassName(
    "new-project-history"
  )[0];
  const NEW_NODE = NEW_PROJECT_HISTORY.cloneNode(true);

  // 프로젝트 입력받는 div, id, class 넣어주기
  const NODE_NUMBER = project_array[index].length;
  NEW_NODE.id = `project-history-${index}-${NODE_NUMBER}`;
  NEW_NODE.className = "project-history";
  addTextNode(
    "h2",
    NEW_NODE,
    `프로젝트 ${Number(index) + 1}-${Number(NODE_NUMBER) + 1}`
  );
  // 경력사항 내 프로젝트 2차원 배열로 관리
  project_array[index].push(NEW_NODE);

  // 지금 위치한 경력사항을 루트로 잡아, 섹션-1-오른쪽부분을 찾아 복제한 프로젝트 입력받는 div를 담기
  const SELECTED_NODE = root.getElementsByClassName("section-1-right")[0];
  SELECTED_NODE.appendChild(NEW_NODE);

  // "프로젝트 보기 버튼"과 연결하기 위해 "지금 복제한 프로젝트 입력받는 div" 요소의 고유 번호를 반환하기
  return NODE_NUMBER;
}

// "새 프로젝트 추가" 버튼 클릭했을 때 함수
function addProject(current) {
  // 현재 경력사항 위치를 꼭대기 root로 미리 선언
  const ROOT_DIV = current.parentNode.parentNode.parentNode;
  const ROOT_INDEX = ROOT_DIV.className.split(" ")[1].split("-")[2];

  // 위에서 만든 함수 돌리기
  addProjectButton(ROOT_INDEX, ROOT_DIV);
  const NODE_NUMBER = addProjectInput(ROOT_INDEX, ROOT_DIV);
  showHistory(ROOT_INDEX, NODE_NUMBER);
}

// "새 경력사항 추가" 버튼 함수
function addJobHistory() {
  // 위에 만들어놨던 "새 경력사항 추가했을 때 추가할 전체 div 템플릿" 복제하기
  const NEW_PROJECT_HISTORY = document.getElementsByClassName("job-history")[0];
  const NEW_NODE = NEW_PROJECT_HISTORY.cloneNode(true);

  // id 값 지정하기
  const NODE_NUMBER = project_array.length;
  NEW_NODE.className = `job-history job-history-${NODE_NUMBER}`;
  addTextNode("h1", NEW_NODE, `경력사항 - ${Number(NODE_NUMBER) + 1}`);

  /*
   * 2차원 배열 공간 생성
   * ex)
   * project_array[0][0...] 에서
   * project_array[1][0...] 사용할 수 있도록
   */
  project_array.push([]);

  // "전체 보여지는 View" div에 자식 요소로 추가하기
  const ROOT_DIV = document.getElementById("root");
  ROOT_DIV.appendChild(NEW_NODE);
}
