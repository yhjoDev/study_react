import React, { useState } from 'react';
import './App.css';

interface UserItem {
  id: number;
  name: string;
  role: string;
}

export default function App() {
  // 변수 선언 및 초기화
  let study_str: string = "친절한 조씨";
  let study_num: number = 30;
  let study_char: string = "A";
  let study_boolean: boolean = true;

  // 배열 선언 및 초기화
  let study_strs: string[] = ["김철수", "이영희", "홍길동"];
  let study_nums: number[] = [90, 85, 100];
  let study_booleans: boolean[] = [true, false, true];

  // 함수 선언
  function study_print(): void {
    console.log("문자열 변수: " + study_str);
    console.log("숫자 변수: " + study_num);
    console.log("문자 변수: " + study_char);
    console.log("불리언 변수: " + study_boolean);
    console.log("문자열 배열: " + study_strs.join(", "));
    console.log("숫자 배열: " + study_nums.join(", "));
    console.log("불리언 배열: " + study_booleans.join(", "));
  } 
  // 함수 선언 (매개변수와 반환값이 있는 함수)
  function study_sum(a: number, b: number): number {
    return a + b;
  }
  // 화살표 함수 선언
  const study_func = (msg: string): void => {
    console.log(msg);
  }

  study_func("화살표 함수 호출: " + study_str);
  study_print();
  console.log("합계: " + study_sum(10, 20));

  // 객체 선언 및 초기화
  const binding_str: string = "친절한 조씨";
  const binding_strArr = ["first", "second", "third"];
  const binding_strObj1 = { name: "메뉴1", key: 1, content: "첫번째 메뉴입니다." };
  const binding_strObj2 = { name: "메뉴2", key: 2, content: "두번째 메뉴입니다." };
  const binding_strList = [binding_strObj1, binding_strObj2];

  // useState를 사용하여 상태 관리
  const [users, setUsers] = useState<UserItem[]>([
    { id: 1, name: '리액트', role: 'Full-stack Developer' },
    { id: 2, name: '아무개', role: 'Frontend Developer' },
  ]);
  // 입력 필드 상태 관리
  const [inputName, setInputName] = useState<string>('');
  const [inputRole, setInputRole] = useState<string>('');

  // 행 추가 함수
  const handleAddUser = () => {
    if (!inputName || !inputRole) return;
    setUsers([...users, { id: Date.now(), name: inputName, role: inputRole }]);
    setInputName('');
    setInputRole('');
  };
  // 행 삭제 함수
  const handleDeleteUser = (id: number) => {
    setUsers(users.filter(user => user.id !== id));
  };

  return (
    <div className="app-container">
      {/* 1. 상단 헤더 영역 */}
      <header className="app-header">
        <h1>{binding_str}의 개발 Workspace</h1>
        <div className="user-profile">
          {binding_strArr.map((b_str, i) => (
            <>
            <span key={i}>{b_str}님 방문을 환영합니다</span>
            { i < binding_strArr.length - 1 && <br/> }
            </>
          ))}
          {/* <span>{binding_str}님 {binding_strArr[0]} 방문을 환영합니다</span><br/>
          <span>{binding_str}님 {binding_strArr[1]} 방문을 환영합니다</span><br/>
          <span>{binding_str}님 {binding_strArr[2]} 방문을 환영합니다</span> */}
        </div>
      </header>

      {/* 2. 본문 레이아웃 (사이드바 + 메인 콘텐츠) */}
      <div className="app-body">
        {/* 사이드바 네비게이션 */}
        <aside className="app-sidebar">
          <nav>
            <ul>
              {binding_strList.map((item) => (
                <li key={item.key}>
                  <a href={`#${item.key}`}>{item.name}</a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* 메인 콘텐츠 영역 */}
        <br/>
        <br/>
        <main className="app-main">
          <section className="card-section">
            <h2>메인 대시보드</h2>
            <div style={{ margin: '15px 0', display: 'flex', gap: '10px' }}>
              <input 
                type="text" 
                placeholder="이름" 
                value={inputName} 
                onChange={(e) => setInputName(e.target.value)} 
              />
              <input 
                type="text" 
                placeholder="역할" 
                value={inputRole} 
                onChange={(e) => setInputRole(e.target.value)} 
              />
              <button onClick={handleAddUser}>행 추가</button>
            </div>
            {/* 테이블 영역 */}
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
              <thead>
                <tr style={{ background: '#eee' }}>
                  <th style={{ border: '1px solid #ddd', padding: '8px' }}>ID</th>
                  <th style={{ border: '1px solid #ddd', padding: '8px' }}>이름</th>
                  <th style={{ border: '1px solid #ddd', padding: '8px' }}>역할</th>
                  <th style={{ border: '1px solid #ddd', padding: '8px' }}>관리</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? 
                  (
                  <tr>
                    <td colSpan={4} style={{ textAlign: 'center', padding: '20px', color: '#888' }}>
                      데이터가 없습니다.
                    </td>
                  </tr>
                  ) : (users.map((user) => (
                    <tr key={user.id}>
                      <td style={{ border: '1px solid #ddd', padding: '8px' }}>{user.id}</td>
                      <td style={{ border: '1px solid #ddd', padding: '8px' }}>{user.name}</td>
                      <td style={{ border: '1px solid #ddd', padding: '8px' }}>{user.role}</td>
                      <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>
                        <button onClick={() => handleDeleteUser(user.id)} style={{ color: 'red' }}>삭제</button>
                      </td>
                    </tr>
                    ))
                  )
                }
              </tbody>
            </table>
          </section>
        </main>
      </div>

      {/* 3. 푸터 영역 */}
      <footer className="app-footer">
        <p>&copy; 2026 Jossidev. All rights reserved.</p>
      </footer>
    </div>
  );
}
