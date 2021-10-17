// storage可以存储带有时效的数据
Storage.prototype.setExpire = (key, value, expire) => {
    let obj = {
        data: value,
        expire: expire
    };
    //localStorage 设置的值不能为对象,转为json字符串
    localStorage.setItem(key, JSON.stringify(obj));
}

Storage.prototype.getExpire = key => {
    let val = localStorage.getItem(key);
    if (!val) {
        return val;
    }
    val = JSON.parse(val);
    console.log(Date.now(), val.expire);
    if (Date.now() > val.expire) {
        localStorage.removeItem(key);
        return null;
    }
    return val.data;
}
