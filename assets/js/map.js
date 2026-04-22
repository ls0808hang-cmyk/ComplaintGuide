/**
 * Kakao Maps API Integration
 * 관할 기관 위치 정보를 지도에 표시합니다.
 */

const KakaoMapManager = {
  map: null,
  marker: null,

  /**
   * 지도 초기화
   * @param {string} containerId - 지도를 담을 HTML 요소 ID
   * @param {number} lat - 위도
   * @param {number} lng - 경도
   */
  init(containerId, lat = 37.5665, lng = 126.9780) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // Kakao Maps API 로드 확인 후 실행
    if (typeof kakao !== 'undefined' && kakao.maps) {
      const options = {
        center: new kakao.maps.LatLng(lat, lng),
        level: 3
      };
      this.map = new kakao.maps.Map(container, options);
      this.addMarker(lat, lng);
    } else {
      console.error('Kakao Maps SDK가 로드되지 않았습니다.');
      container.innerHTML = '<p style="padding: 20px; text-align: center;">지도를 불러올 수 없습니다. (SDK 미로드)</p>';
    }
  },

  /**
   * 마커 추가
   */
  addMarker(lat, lng) {
    const markerPosition = new kakao.maps.LatLng(lat, lng);
    this.marker = new kakao.maps.Marker({
      position: markerPosition
    });
    this.marker.setMap(this.map);
  },

  /**
   * 주소로 장소 표시
   * @param {string} address - 기관 주소
   * @param {string} title - 기관 이름
   */
  searchAddress(address, title) {
    if (!this.map) return;
    
    const geocoder = new kakao.maps.services.Geocoder();
    geocoder.addressSearch(address, (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
        
        this.marker.setPosition(coords);
        this.map.setCenter(coords);

        const infowindow = new kakao.maps.InfoWindow({
          content: `<div style="padding:5px;font-size:12px;">${title}</div>`
        });
        infowindow.open(this.map, this.marker);
      }
    });
  }
};

// 사용 예시:
// <script src="//dapi.kakao.com/v2/maps/sdk.js?appkey=YOUR_APP_KEY&libraries=services"></script>
// KakaoMapManager.init('map-container');
