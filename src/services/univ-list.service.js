import axios from 'axios';

class UnivListService {
  async getList({ params }) {
    const response = await axios.get('http://universities.hipolabs.com/search', {
      params: { country: params.country },
    });
    return response.data;
  }
}

export default new UnivListService();
