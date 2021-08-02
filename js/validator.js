function Validator(){
    this.errors = {}
}

Validator.prototype.isRequired = function(name, value){
    if(!value){
        this.errors[name] = 'Vui Lòng Điền Vào Ô Này';
        return false;
    }
    document.getElementById(name).style.display = 'none';
    return true;
}

Validator.prototype.chonChucVu = function(name, chucVu){
    if(chucVu == 'Chọn chức vụ'){
        this.errors[name] = 'Vui Lòng Chọn Chức Vụ';
        return false;
    }
    document.getElementById(name).style.display = 'none';
    return true;
}

Validator.prototype.email = function(name, email){
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
        document.getElementById(name).style.display = 'none';
        return true;
    }else{
        this.errors[name] = 'Email không đúng định dạng';
        return false;
    }

}

Validator.prototype.taiKhoan = function(name, taiKhoan){
    if (/^\d{4,6}$/.test(taiKhoan)){
        document.getElementById(name).style.display = 'none';
        return true;
    }
    else{
        this.errors[name] = 'Tài khoản phải là dạng chữ số, có độ dài từ 4-6 chữ ký số';
        return false;
    }
}

Validator.prototype.taiKhoanTonTai = function(name, taiKhoan, DSNV){
    for(nhanVien of DSNV){
        if(nhanVien.taiKhoan === taiKhoan){
            this.errors[name] = 'Tài khoản đã tồn tại';
            return false;
        }
    }
    document.getElementById(name).style.display = 'none';
    return true;
}
Validator.prototype.taiKhoanKhongTonTai = function(name, taiKhoan, DSNV){
    for(nhanVien of DSNV){
        if(nhanVien.taiKhoan === taiKhoan){
            document.getElementById(name).style.display = 'none';
            return true;
        }
    }
    this.errors[name] = 'Tài khoản không tồn tại';
    return false;
}

Validator.prototype.hoTen = function(name, hoTen){
    if (/^([a-zA-Z _-]+)$/.test(hoTen)){
        document.getElementById(name).style.display = 'none';
        return true;
    }
    else{
        this.errors[name] = 'Họ tên chỉ được phép điền vào dạng chữ';
        return false;

    }
}

Validator.prototype.matKhau = function(name, matKhau){
    if (/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,10}$/.test(matKhau)){
        document.getElementById(name).style.display = 'none';
        return true;
    }
    else{
        this.errors[name] = 'Mật khẩu có độ dài từ 6-10 ký tự, phải có ít nhất 1 chữ hoa, ít nhất 1 số, ít nhất 1 ký tự đặc biệt';
        return false;

    }
}

Validator.prototype.ngayLam = function(name, ngayLam){
    if (/^((0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])[- /.](19|20)?[0-9]{2})*$/.test(ngayLam)){
        document.getElementById(name).style.display = 'none';
        return true;
    }
    else{
        this.errors[name] = 'Ngày Làm phải được điền ở định dạng MM/DD/YYYY';
        return false;
    }
}

Validator.prototype.luongCB = function(name, luongCB){
    if (luongCB>=1000000 && luongCB<= 20000000){
        document.getElementById(name).style.display = 'none';
        return true;
    }
    else if(isNaN(luongCB)){
        this.errors[name] = 'Vui lòng điền số';
        return false;
    }
    else{
        this.errors[name] = 'Lương Cơ Bản phải ở mức từ 1.000.000 đến 20.000.000';
        return false;
    }
}

Validator.prototype.gioLam = function(name, gioLam){
    if (gioLam>=80 && gioLam<= 200){
        document.getElementById(name).style.display = 'none';
        return true;
    }
    else if(isNaN(gioLam)){
        this.errors[name] = 'Vui lòng điền số';
        return false;
    }
    else{
        this.errors[name] = 'Giờ Làm phải ở mức từ 80 đến 200';
        return false;
    }
}


