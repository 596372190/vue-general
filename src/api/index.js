import request from '../utils/request';

export const fetchData = query => {
    return request({
        url: './user.json',
        method: 'get',
        params: query
    });
};
