const BASE_URL = 'http://121.199.1.64/';
const LOCAL_URL = 'http://localhost:3000/';
const MockURL = {
  getShoppingMallInfo: BASE_URL + 'mock.json',
  getGoodsInfo: BASE_URL + 'getGoodsInfo',
  registerUser: LOCAL_URL + 'user/register',
  loginUser: LOCAL_URL + 'user/login',
  getDetailGoodInfo: LOCAL_URL + 'goods/getDetailGoodInfo',
  getCategoryList: LOCAL_URL + 'goods/getCategoryList',
  getCategorySubList: LOCAL_URL + 'goods/getCategorySubList',
};

module.exports = MockURL;