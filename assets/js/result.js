/**
 * Result rendering and matching logic
 */

async function initResultPage() {
  const params = new URLSearchParams(window.location.search);
  const query = params.get('q');
  const resultContainer = document.getElementById('result-container');
  const queryDisplay = document.getElementById('query-display');

  if (queryDisplay) queryDisplay.textContent = query || '모든 민원 안내';

  try {
    const response = await fetch('/data/complaints.json');
    const data = await response.json();
    const complaints = data.complaints;

    const filtered = query ? matchComplaints(complaints, query) : complaints;

    renderResults(filtered, resultContainer);
  } catch (error) {
    console.error('데이터를 불러오는 중 오류가 발생했습니다:', error);
    resultContainer.innerHTML = '<p>정보를 불러오는 데 실패했습니다. 잠시 후 다시 시도해주세요.</p>';
  }
}

function matchComplaints(complaints, query) {
  const searchTerms = query.toLowerCase().split(/\s+/).filter(t => t.length > 0);
  
  return complaints.map(item => {
    let score = 0;
    const title = item.title.toLowerCase();
    const keywords = item.keywords.map(k => k.toLowerCase());
    const description = item.description.toLowerCase();

    searchTerms.forEach(term => {
      if (title.includes(term)) score += 10;
      keywords.forEach(kw => {
        if (kw.includes(term)) score += 5;
      });
      if (description.includes(term)) score += 2;
    });

    return { ...item, score };
  })
  .filter(item => item.score > 0 || !query)
  .sort((a, b) => b.score - a.score);
}

function renderResults(results, container) {
  if (results.length === 0) {
    container.innerHTML = `
      <div class="result-card">
        <p>죄송합니다. 정확히 일치하는 정보를 찾지 못했습니다.</p>
        <p>다른 키워드로 검색해보시거나, 아래의 전체 가이드를 확인해보세요.</p>
        <a href="/guides/" class="btn-primary">전체 가이드 보기</a>
      </div>
    `;
    return;
  }

  container.innerHTML = results.map(item => `
    <div class="result-card">
      <span class="agency-badge">${item.category}</span>
      <h2 class="section-title" style="margin-top: 0;">${item.title}</h2>
      <p style="margin-bottom: 1.5rem;">${item.description}</p>
      
      <h3 class="section-title">📍 추천 문의 기관</h3>
      <p>${item.recommendedAgency}</p>
      
      <h3 class="section-title">📋 준비물 체크리스트</h3>
      <ul class="checklist">
        ${item.documents.map(doc => `<li>${doc}</li>`).join('')}
      </ul>
      
      <h3 class="section-title">⚠️ 유의사항</h3>
      <p>${item.cautions}</p>
      
      <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
        <a href="${item.officialUrl}" target="_blank" rel="noopener noreferrer" class="btn-primary">공식 사이트 바로가기</a>
        <a href="${item.guideUrl}" class="btn-primary" style="background-color: #64748b;">상세 가이드 읽기</a>
      </div>
      
      <div style="margin-top: 1.5rem; font-size: 0.875rem; color: #64748b;">
        <p>* 본 정보는 참고용이며, 정확한 내용은 해당 기관에 확인하시기 바랍니다.</p>
      </div>
    </div>
  `).join('');
}

// 페이지 로드 시 초기화
if (window.location.pathname.includes('/search/')) {
  document.addEventListener('DOMContentLoaded', initResultPage);
}
