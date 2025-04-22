    // 사용자 관리 - 수정 모달 열기
    const editButtons = document.querySelectorAll('.btn-edit');
    const userModal = document.getElementById('user-modal');
    
    editButtons.forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            
            // 현재 사용자 데이터 모달에 채우기
            document.getElementById('edit-name').value = row.cells[0].textContent;
            
            // 중대 선택
            const userBattalion = row.cells[1].textContent;
            const battalionSelect = document.getElementById('edit-battalion');
            
            for (let i = 0; i < battalionSelect.options.length; i++) {
                if (battalionSelect.options[i].text === userBattalion) {
                    battalionSelect.selectedIndex = i;
                    break;
                }
            }
            
            // 학년 선택
            const userGrade = row.cells[2].textContent;
            const gradeSelect = document.getElementById('edit-grade');
            
            for (let i = 0; i < gradeSelect.options.length; i++) {
                if (gradeSelect.options[i].text === userGrade) {
                    gradeSelect.selectedIndex = i;
                    break;
                }
            }
            
            // 교번
            document.getElementById('edit-id').value = row.cells[3].textContent;
            
            // 상태 선택
            const userStatus = row.cells[5].querySelector('.status-badge').textContent;
            const statusSelect = document.getElementById('edit-status');
            
            for (let i = 0; i < statusSelect.options.length; i++) {
                if (statusSelect.options[i].text === userStatus) {
                    statusSelect.selectedIndex = i;
                    break;
                }
            }
            
            // 모달 표시
            userModal.style.display = 'flex';
        });
    });

    // 사용자 관리 - 차단/활성화 버튼
    const banButtons = document.querySelectorAll('.btn-ban');
    const activateButtons = document.querySelectorAll('.btn-activate');
    
    banButtons.forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            const statusCell = row.cells[5];
            
            // 상태 변경: 활성 -> 차단
            statusCell.innerHTML = '<span class="status-badge status-inactive">차단</span>';
            
            // 버튼 변경: 차단 -> 활성화
            this.outerHTML = '<button class="btn-action btn-activate">활성화</button>';
            
            // 새 버튼에 이벤트 다시 연결 (DOM 업데이트 후)
            row.querySelector('.btn-activate').addEventListener('click', function() {
                statusCell.innerHTML = '<span class="status-badge status-active">활성</span>';
                
                // 버튼 변경: 활성화 -> 차단
                this.outerHTML = '<button class="btn-action btn-ban">차단</button>';
                
                // 이벤트 리스너 재연결
                addBanButtonListeners();
                
                // 활성화 메시지 표시
                showMessage(`사용자가 활성화되었습니다.`, 'success');
            });
            
            // 차단 메시지 표시
            showMessage(`사용자가 차단되었습니다.`, 'error');
        });
    });
    
    // 차단 버튼 이벤트 리스너 추가 함수
    function addBanButtonListeners() {
        document.querySelectorAll('.btn-ban').forEach(button => {
            if (!button.hasAttribute('data-event-attached')) {
                button.setAttribute('data-event-attached', 'true');
                button.addEventListener('click', function() {
                    const row = this.closest('tr');
                    const statusCell = row.cells[5];
                    
                    // 상태 변경: 활성 -> 차단
                    statusCell.innerHTML = '<span class="status-badge status-inactive">차단</span>';
                    
                    // 버튼 변경: 차단 -> 활성화
                    this.outerHTML = '<button class="btn-action btn-activate">활성화</button>';
                    
                    // 활성화 버튼 이벤트 리스너 재연결
                    addActivateButtonListeners();
                    
                    // 차단 메시지 표시
                    showMessage(`사용자가 차단되었습니다.`, 'error');
                });
            }
        });
    }
    
    // 활성화 버튼 이벤트 리스너 추가 함수
    function addActivateButtonListeners() {
        document.querySelectorAll('.btn-activate').forEach(button => {
            if (!button.hasAttribute('data-event-attached')) {
                button.setAttribute('data-event-attached', 'true');
                button.addEventListener('click', function() {
                    const row = this.closest('tr');
                    const statusCell = row.cells[5];
                    
                    // 상태 변경: 차단 -> 활성
                    statusCell.innerHTML = '<span class="status-badge status-active">활성</span>';
                    
                    // 버튼 변경: 활성화 -> 차단
                    this.outerHTML = '<button class="btn-action btn-ban">차단</button>';
                    
                    // 차단 버튼 이벤트 리스너 재연결
                    addBanButtonListeners();
                    
                    // 활성화 메시지 표시
                    showMessage(`사용자가 활성화되었습니다.`, 'success');
                });
            }
        });
    }document.addEventListener('DOMContentLoaded', function() {
    // 탭 전환 기능
    const navItems = document.querySelectorAll('.nav-item');
    const tabPanes = document.querySelectorAll('.tab-pane');

    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 현재 활성화된 탭 제거
            navItems.forEach(nav => nav.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // 선택한 탭 활성화
            this.classList.add('active');
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // 서브탭 전환 기능
    const subTabs = document.querySelectorAll('.subtab');
    
    subTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // 현재 탭 패널 내의 서브탭과 서브패널만 선택
            const parent = this.closest('.tab-pane');
            const subTabs = parent.querySelectorAll('.subtab');
            const subPanes = parent.querySelectorAll('.subpane');
            
            // 현재 활성화된 서브탭 제거
            subTabs.forEach(tab => tab.classList.remove('active'));
            subPanes.forEach(pane => pane.classList.remove('active'));
            
            // 선택한 서브탭 활성화
            this.classList.add('active');
            const subId = this.getAttribute('data-sub');
            if (parent.querySelector('#' + subId)) {
                parent.querySelector('#' + subId).classList.add('active');
            }
        });
    });
    
    // 사용자 검색 기능
    document.getElementById('user-search').addEventListener('input', function() {
        const searchText = this.value.toLowerCase();
        const userRows = document.querySelectorAll('#user-table-body tr');
        
        userRows.forEach(row => {
            const userName = row.cells[0].textContent.toLowerCase();
            
            if (userName.includes(searchText)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    });

    // 사용자 관리 - 수정 모달 열기
    const editButtons = document.querySelectorAll('.btn-edit');
    const userModal = document.getElementById('user-modal');
    
    editButtons.forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            
            // 현재 사용자 데이터 모달에 채우기
            document.getElementById('edit-name').value = row.cells[0].textContent;
            
            // 중대 선택
            const userBattalion = row.cells[1].textContent;
            const battalionSelect = document.getElementById('edit-battalion');
            
            for (let i = 0; i < battalionSelect.options.length; i++) {
                if (battalionSelect.options[i].text === userBattalion) {
                    battalionSelect.selectedIndex = i;
                    break;
                }
            }
            
            // 학년 선택
            const userGrade = row.cells[2].textContent;
            const gradeSelect = document.getElementById('edit-grade');
            
            for (let i = 0; i < gradeSelect.options.length; i++) {
                if (gradeSelect.options[i].text === userGrade) {
                    gradeSelect.selectedIndex = i;
                    break;
                }
            }
            
            // 군번
            document.getElementById('edit-id').value = row.cells[3].textContent;
            
            // 상태 선택
            const userStatus = row.cells[5].querySelector('.status-badge').textContent;
            const statusSelect = document.getElementById('edit-status');
            
            for (let i = 0; i < statusSelect.options.length; i++) {
                if (statusSelect.options[i].text === userStatus) {
                    statusSelect.selectedIndex = i;
                    break;
                }
            }
            
            // 모달 표시
            userModal.style.display = 'flex';
        });
    });

    // 사용자 관리 - 차단/활성화 버튼
    const banButtons = document.querySelectorAll('.btn-ban');
    const activateButtons = document.querySelectorAll('.btn-activate');
    
    banButtons.forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            const statusCell = row.cells[5];
            
            // 상태 변경: 활성 -> 차단
            statusCell.innerHTML = '<span class="status-badge status-inactive">차단</span>';
            
            // 버튼 변경: 차단 -> 활성화
            this.outerHTML = '<button class="btn-action btn-activate">활성화</button>';
            
            // 새 버튼에 이벤트 다시 연결 (DOM 업데이트 후)
            row.querySelector('.btn-activate').addEventListener('click', function() {
                statusCell.innerHTML = '<span class="status-badge status-active">활성</span>';
                
                // 버튼 변경: 활성화 -> 차단
                this.outerHTML = '<button class="btn-action btn-ban">차단</button>';
                
                // 이벤트 리스너 재연결
                addBanButtonListeners();
            });
        });
    });
    
    // 차단 버튼 이벤트 리스너 추가 함수
    function addBanButtonListeners() {
        document.querySelectorAll('.btn-ban').forEach(button => {
            if (!button.hasAttribute('data-event-attached')) {
                button.setAttribute('data-event-attached', 'true');
                button.addEventListener('click', function() {
                    const row = this.closest('tr');
                    const statusCell = row.cells[5];
                    
                    // 상태 변경: 활성 -> 차단
                    statusCell.innerHTML = '<span class="status-badge status-inactive">차단</span>';
                    
                    // 버튼 변경: 차단 -> 활성화
                    this.outerHTML = '<button class="btn-action btn-activate">활성화</button>';
                    
                    // 활성화 버튼 이벤트 리스너 재연결
                    addActivateButtonListeners();
                });
            }
        });
    }
    
    // 활성화 버튼 이벤트 리스너 추가 함수
    function addActivateButtonListeners() {
        document.querySelectorAll('.btn-activate').forEach(button => {
            if (!button.hasAttribute('data-event-attached')) {
                button.setAttribute('data-event-attached', 'true');
                button.addEventListener('click', function() {
                    const row = this.closest('tr');
                    const statusCell = row.cells[5];
                    
                    // 상태 변경: 차단 -> 활성
                    statusCell.innerHTML = '<span class="status-badge status-active">활성</span>';
                    
                    // 버튼 변경: 활성화 -> 차단
                    this.outerHTML = '<button class="btn-action btn-ban">차단</button>';
                    
                    // 차단 버튼 이벤트 리스너 재연결
                    addBanButtonListeners();
                });
            }
        });
    }
    
    // 초기 이벤트 리스너 설정
    addBanButtonListeners();
    addActivateButtonListeners();

    // 사용자 모달 닫기
    document.querySelectorAll('.close, #cancel-edit').forEach(element => {
        element.addEventListener('click', function() {
            userModal.style.display = 'none';
        });
    });

    // 사용자 정보 저장
    document.getElementById('save-user').addEventListener('click', function() {
        const editedName = document.getElementById('edit-name').value;
        const editedBattalion = document.getElementById('edit-battalion').options[document.getElementById('edit-battalion').selectedIndex].text;
        const editedGrade = document.getElementById('edit-grade').options[document.getElementById('edit-grade').selectedIndex].text;
        const editedId = document.getElementById('edit-id').value;
        const editedStatus = document.getElementById('edit-status').options[document.getElementById('edit-status').selectedIndex].text;
        
        if (!editedName || !editedId) {
            showMessage('이름과 교번은 필수 입력사항입니다.', 'error');
            return;
        }
        
        // 현재 선택된 행 찾기 (추후 업데이트 시 구현)
        // 모의 성공 메시지
        showMessage('사용자 정보가 성공적으로 수정되었습니다.', 'success');
        userModal.style.display = 'none';
    });

    // 새 사용자 추가 모달
    const addUserModal = document.getElementById('add-user-modal');
    
    document.getElementById('add-user').addEventListener('click', function() {
        addUserModal.style.display = 'flex';
    });
    
    document.querySelectorAll('#add-user-modal .close, #cancel-add').forEach(element => {
        element.addEventListener('click', function() {
            addUserModal.style.display = 'none';
        });
    });
    
    document.getElementById('create-user').addEventListener('click', function() {
        const newName = document.getElementById('new-name').value;
        const newBattalion = document.getElementById('new-battalion').options[document.getElementById('new-battalion').selectedIndex].text;
        const newGrade = document.getElementById('new-grade').options[document.getElementById('new-grade').selectedIndex].text;
        const newId = document.getElementById('new-id').value;
        
        if (!newName || !newId) {
            showMessage('이름과 교번은 필수 입력사항입니다.', 'error');
            return;
        }
        
        // 유저 테이블에 새 행 추가
        const tbody = document.getElementById('user-table-body');
        const newRow = tbody.insertRow();
        
        // 새 행 내용 채우기
        newRow.innerHTML = `
            <td>${newName}</td>
            <td>${newBattalion}</td>
            <td>${newGrade}</td>
            <td>${newId}</td>
            <td>0</td>
            <td><span class="status-badge status-active">활성</span></td>
            <td>
                <button class="btn-action btn-edit">수정</button>
                <button class="btn-action btn-ban">차단</button>
            </td>
        `;
        
        // 새로 추가된 버튼에 이벤트 리스너 연결
        const editBtn = newRow.querySelector('.btn-edit');
        editBtn.addEventListener('click', function() {
            const row = this.closest('tr');
            document.getElementById('edit-name').value = row.cells[0].textContent;
            // 나머지 필드도 유사하게 설정
            userModal.style.display = 'flex';
        });
        
        // 차단 버튼 이벤트 리스너 추가
        addBanButtonListeners();
        
        // 모달 닫기
        addUserModal.style.display = 'none';
        
        // 성공 메시지
        showMessage('새 사용자가 성공적으로 추가되었습니다.', 'success');
    });

    // 예약 취소 버튼 이벤트
    document.querySelectorAll('.btn-cancel').forEach(button => {
        button.addEventListener('click', function() {
            if (confirm('정말로 이 예약을 취소하시겠습니까?')) {
                // 행 삭제 또는 상태 변경
                const row = this.closest('tr');
                row.parentNode.removeChild(row);
                
                // 성공 메시지
                showMessage('예약이 취소되었습니다.', 'success');
            }
        });
    });

    // 필터 적용 버튼 이벤트
    document.getElementById('apply-filters').addEventListener('click', function() {
        const battalion = document.getElementById('battalion-filter').value;
        const date = document.getElementById('date-filter').value;
        
        // 모든 행을 가져옴
        const rows = document.querySelectorAll('#reservation-table-body tr');
        
        // 각 행을 순회하며 필터 조건에 맞는지 확인
        rows.forEach(row => {
            let showRow = true;
            
            // 중대 필터 적용
            if (battalion !== 'all') {
                const rowBattalion = row.cells[1].textContent;
                if (rowBattalion !== battalion + '중대') {
                    showRow = false;
                }
            }
            
            // 날짜 필터 적용
            if (date) {
                const rowDate = row.cells[3].textContent; // 2025.04.22 형식
                const formattedDate = formatDateForComparison(rowDate);
                if (formattedDate !== date) {
                    showRow = false;
                }
            }
            
            // 필터 결과에 따라 행 표시/숨김
            row.style.display = showRow ? '' : 'none';
        });
        
        showMessage(`필터 적용됨: 중대=${battalion === 'all' ? '전체' : battalion + '중대'}, 날짜=${date || '전체'}`, 'info');
    });
    
    document.getElementById('apply-recliner-filters').addEventListener('click', function() {
        const location = document.getElementById('location-filter').value;
        const date = document.getElementById('recliner-date-filter').value;
        
        // 모든 행을 가져옴
        const rows = document.querySelectorAll('#recliner-reservation-table-body tr');
        
        // 각 행을 순회하며 필터 조건에 맞는지 확인
        rows.forEach(row => {
            let showRow = true;
            
            // 위치 필터 적용
            if (location !== 'all') {
                const rowLocation = row.cells[2].textContent;
                const locationMap = {
                    'danjae': '단재관',
                    'library': '학술정보원'
                };
                
                if (rowLocation !== locationMap[location]) {
                    showRow = false;
                }
            }
            
            // 날짜 필터 적용
            if (date) {
                const rowDate = row.cells[4].textContent; // 2025.04.22 형식
                const formattedDate = formatDateForComparison(rowDate);
                if (formattedDate !== date) {
                    showRow = false;
                }
            }
            
            // 필터 결과에 따라 행 표시/숨김
            row.style.display = showRow ? '' : 'none';
        });
        
        showMessage(`필터 적용됨: 위치=${location === 'all' ? '전체' : (location === 'danjae' ? '단재관' : '학술정보원')}, 날짜=${date || '전체'}`, 'info');
    });
    
    // 날짜 형식 변환 함수 (2025.04.22 -> 2025-04-22)
    function formatDateForComparison(dateString) {
        if (!dateString) return '';
        
        const parts = dateString.split('.');
        if (parts.length !== 3) return '';
        
        return `${parts[0]}-${parts[1]}-${parts[2]}`;
    }

    // 알림 전송 버튼 이벤트
    document.getElementById('send-notification').addEventListener('click', function() {
        const target = document.getElementById('notification-target').value;
        const title = document.getElementById('notification-title').value;
        const content = document.getElementById('notification-content').value;
        
        if (!title || !content) {
            showMessage('제목과 내용을 모두 입력해주세요.', 'error');
            return;
        }
        
        // 알림 전송 (단순 메시지로 대체)
        showMessage(`알림이 성공적으로 전송되었습니다!`, 'success');
        
        // 입력 필드 초기화
        document.getElementById('notification-title').value = '';
        document.getElementById('notification-content').value = '';
        
        // 알림 배지 카운트 감소
        const badge = document.querySelector('.notification-badge');
        let count = parseInt(badge.textContent);
        if (count > 0) {
            badge.textContent = count - 1;
            if (count - 1 === 0) {
                badge.style.display = 'none';
            }
        }
    });

    // 알림 설정 저장 버튼 이벤트
    document.getElementById('save-notification-settings').addEventListener('click', function() {
        // 설정 저장 (단순 메시지로 대체)
        showMessage('알림 설정이 저장되었습니다.', 'success');
    });

    // 시설 설정 저장 버튼 이벤트
    document.getElementById('save-settings').addEventListener('click', function() {
        // 설정 저장 (단순 메시지로 대체)
        showMessage('시설 설정이 저장되었습니다.', 'success');
    });

    // 회원 목록 다운로드 버튼 이벤트
    document.getElementById('export-users').addEventListener('click', function() {
        showMessage('회원 목록이 CSV 형식으로 다운로드됩니다.', 'info');
    });

    // 메시지 표시 함수
    function showMessage(message, type = 'success') {
        // 기존 메시지 제거
        const existingMessage = document.querySelector('.message-popup');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // 새 메시지 생성
        const messageElement = document.createElement('div');
        messageElement.className = `message-popup ${type}`;
        messageElement.textContent = message;
        
        // 메시지 추가
        document.body.appendChild(messageElement);
        
        // 애니메이션 효과
        setTimeout(() => {
            messageElement.classList.add('show');
        }, 10);
        
        // 일정 시간 후 메시지 제거
        setTimeout(() => {
            messageElement.classList.remove('show');
            setTimeout(() => {
                messageElement.remove();
            }, 300);
        }, 3000);
    }

    // 모달 외부 클릭 시 닫기
    window.addEventListener('click', function(event) {
        if (event.target === userModal) {
            userModal.style.display = 'none';
        }
        if (event.target === addUserModal) {
            addUserModal.style.display = 'none';
        }
    });

    // 버튼 호버 효과
    const buttons = document.querySelectorAll('.button');
    buttons.forEach(button => {
        button.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.95)';
        });
        button.addEventListener('mouseup', function() {
            this.style.transform = '';
        });
        button.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });

    // 카드 요소 애니메이션 효과
    document.querySelectorAll('.card').forEach(card => {
        setTimeout(() => {
            card.classList.add('animate-in');
        }, 100 * Array.from(document.querySelectorAll('.card')).indexOf(card));
    });

    // 통계 카드 색상 변화 효과
    document.querySelectorAll('.stat-card').forEach(card => {
        const value = parseInt(card.querySelector('.stat-value').textContent);
        if (value >= 70) {
            card.style.borderLeft = '4px solid #ef4444';
        } else if (value >= 50) {
            card.style.borderLeft = '4px solid #f59e0b';
        } else {
            card.style.borderLeft = '4px solid #10b981';
        }
    });

    // 현재 날짜 설정
    const today = new Date();
    const dateInputs = document.querySelectorAll('input[type="date"]');
    dateInputs.forEach(input => {
        if (!input.value) {
            const year = today.getFullYear();
            const month = String(today.getMonth() + 1).padStart(2, '0');
            const day = String(today.getDate()).padStart(2, '0');
            input.value = `${year}-${month}-${day}`;
        }
    });
});