function NhanVien(taiKhoan, hoTen, email, matKhau, ngayLam, luongCB, chucVu, gioLam, tongLuong = 0, xepLoai = ''){
    this.taiKhoan = taiKhoan;
    this.hoTen = hoTen;
    this.email = email;
    this.matKhau = matKhau;
    this.ngayLam = ngayLam;
    this.luongCB = luongCB;
    this.chucVu = chucVu;
    this.gioLam = gioLam;
    this.tongLuong = tongLuong;
    this.xepLoai = xepLoai;
}

DSNV = [];

function InDSNV(dsnv) {
    dsnv = DSNV || null;
    var tableDanhSach = document.getElementById('tableDanhSach');
    tableDanhSach.innerHTML = '';
    var html_list = '';

    for(nv of DSNV) {
        nv.tongLuong = tinhLuong(nv.chucVu, nv.luongCB);
        nv.xepLoai = xepLoai(nv.gioLam);

        var html = 
        `
        <tbody>
            <td> ${nv.taiKhoan} </td>
            <td> ${nv.hoTen}</td>
            <td> ${nv.email}</td>
            <td> ${nv.ngayLam}</td>
            <td> ${nv.chucVu}</td>
            <td> ${nv.tongLuong}</td>
            <td> ${nv.xepLoai}</td>
            <td> 
            <button class = 'btn btn-danger' data-taiKhoan='${nv.taiKhoan}' data-action = 'xoa'>Xóa</button>

             <button class = 'btn btn-success' data-taiKhoan='${nv.taiKhoan}' data-action = 'capNhat' data-toggle='modal' data-target="#myModal">Cập Nhật</button>

             </td>
        </tbody>
        `

        html_list += html;

        tableDanhSach.innerHTML = html_list;
    }
}

document
.getElementById('btnThemNV')
.addEventListener('click', themNhanVien);

function themNhanVien(){
    var taiKhoan = document.getElementById('tknv').value;
    var hoTen = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var matKhau = document.getElementById('password').value;
    var ngayLam = document.getElementById('datepicker').value;
    var luongCB = document.getElementById('luongCB').value;
    luongCB = parseInt(luongCB);
    var chucVu = document.getElementById('chucvu').value;
    var gioLam = document.getElementById('gioLam').value; 
    gioLam = parseInt(gioLam);

    var nv = new NhanVien(
        taiKhoan, 
        hoTen,
        email,
        matKhau,
        ngayLam,
        luongCB,
        chucVu,
        gioLam,
    );

    var isvalid = validator('Them', nv);

    if(!isvalid){
        return;
    }


    DSNV.push(nv);
    InDSNV(DSNV)

    document.getElementById('myform').reset();
    document.getElementById('btnDong').click();
}

// Câu 5
function tinhLuong(chucVu, luongCB){
    if (chucVu == 'Nhân viên') return luongCB;
    if (chucVu == 'Trưởng phòng') return luongCB * 2;
    if (chucVu == 'Sếp') return luongCB * 3;
}

// Câu 6
function xepLoai(gioLam){
    if (gioLam >= 192) return 'Xuất Sắc';
    if (gioLam >= 176) return 'Giỏi';
    if (gioLam >= 160) return 'Khá';
    if (gioLam < 160) return 'Trung Bình';
}

// Câu 4
function validator(action ,nv){
    var validator = new Validator();
    
    if (action == 'Them'){
        var isValid = validator.isRequired("tbTKNV",nv.taiKhoan) && validator.taiKhoan("tbTKNV", nv.taiKhoan) && validator.taiKhoanTonTai('tbTKNV', nv.taiKhoan, DSNV) ;
    }
    else if (action == 'CapNhat'){
        var isValid = validator.isRequired("tbTKNV",nv.taiKhoan) && validator.taiKhoan("tbTKNV", nv.taiKhoan) && validator.taiKhoanKhongTonTai("tbTKNV", nv.taiKhoan, DSNV);
    };

    isValid &= validator.isRequired("tbTen",nv.hoTen) && validator.hoTen("tbTen", nv.hoTen);

    isValid &= validator.isRequired("tbEmail",nv.email) && validator.email('tbEmail', nv.email);

    isValid &= validator.isRequired("tbMatKhau",nv.matKhau) && validator.matKhau("tbMatKhau",nv.matKhau);

    isValid &= validator.isRequired("tbNgay",nv.ngayLam) && validator.ngayLam('tbNgay', nv.ngayLam);

    isValid &= validator.isRequired("tbLuongCB",nv.luongCB) && validator.luongCB("tbLuongCB",nv.luongCB);

    isValid &= validator.isRequired("tbGiolam",nv.gioLam) && validator.gioLam("tbGiolam",nv.gioLam);
    
    isValid &= validator.chonChucVu("tbChucVu",nv.chucVu);

    if(!isValid){
        for (var key in validator.errors){
            if(validator.errors[key]){
                var span_thongbao = document.getElementById(key)
                span_thongbao.innerHTML = validator.errors[key];
                span_thongbao.style.display = 'block';
            }
        }
        return false;
    }
    return true;
}

// Câu 7
document
.getElementById('tableDanhSach')
.addEventListener('click', delegation);

function delegation(event){
    var taiKhoan = event.target.getAttribute('data-taiKhoan');
    var action = event.target.getAttribute('data-action');

    if (action === 'xoa'){
        xoaNhanVien(taiKhoan);
    };

    if (action === 'capNhat'){
        var nhanvien = timNVTheoTaiKhoan(taiKhoan)[0];
        selectNV(nhanvien);
    }

}

// Câu 8
function selectNV(nhanvien){
    console.log(nhanvien);
    document.getElementById('tknv').value = nhanvien.taiKhoan;
    document.getElementById('name').value = nhanvien.hoTen;
    document.getElementById('email').value = nhanvien.email;
    document.getElementById('password').value = nhanvien.matKhau;
    document.getElementById('datepicker').value = nhanvien.ngayLam;
    document.getElementById('luongCB').value = nhanvien.luongCB;
    document.getElementById('chucvu').value = nhanvien.chucVu;
    document.getElementById('gioLam').value = nhanvien.gioLam; 

    var taiKhoan = document.getElementById('tknv').style.pointerEvents= 'none';
    taiKhoan = document.getElementById('tknv').style.background= 'gray';

    document
    .getElementById('btnCapNhat')
    .removeAttribute('data-dismiss', 'modal')
}

document
.getElementById('btnCapNhat')
.addEventListener('click', capNhatNV);

function capNhatNV(nhanvien){
    var taiKhoan = document.getElementById('tknv').value;
    var hoTen = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var matKhau = document.getElementById('password').value;
    var ngayLam = document.getElementById('datepicker').value;
    var luongCB = document.getElementById('luongCB').value;
    luongCB = parseInt(luongCB);
    var chucVu = document.getElementById('chucvu').value;
    var gioLam = document.getElementById('gioLam').value; 
    gioLam = parseInt(gioLam);

    var nhanvien = new NhanVien(
        taiKhoan, 
        hoTen,
        email,
        matKhau,
        ngayLam,
        luongCB,
        chucVu,
        gioLam,
    );
    var isvalid = validator('CapNhat', nhanvien);

    if(!isvalid){
        return;
    }

    document
    .getElementById('btnCapNhat')
    .setAttribute('data-dismiss', 'modal')

    var taiKhoan = document.getElementById('tknv').value;
    
    var nhanvien = DSNV.find(function(NV){
        return NV.taiKhoan === taiKhoan;
    });

    nhanvien.hoTen = document.getElementById('name').value;
    nhanvien.email = document.getElementById('email').value;
    nhanvien.matKhau = document.getElementById('password').value;
    nhanvien.ngayLam = document.getElementById('datepicker').value;
    nhanvien.luongCB = document.getElementById('luongCB').value;
    nhanvien.chucVu = document.getElementById('chucvu').value;
    nhanvien.gioLam = document.getElementById('gioLam').value; 

    InDSNV(DSNV)


}

document
.getElementById('btnTimNV')
.addEventListener('click', timNVTheoXepLoai)

function timNVTheoXepLoai() {
    var search = document.getElementById('searchName').value;
    var searchValue = search.trim().toLowerCase();

    var newDSNV = DSNV.filter(function(nv){
        var xepLoaiNV= nv.xepLoai.trim().toLowerCase();
        return xepLoaiNV.indexOf(searchValue) !== -1;
    })

    InDSNV(newDSNV);
}
function timNVTheoTaiKhoan(taiKhoan) {
    var nhanvien = DSNV.filter(function(nv){
        return nv.taiKhoan.indexOf(taiKhoan) !== -1;
    })
    return nhanvien
}


function xoaNhanVien(taiKhoan){
    DSNV = DSNV.filter(function(nv){
        return nv.taiKhoan !== taiKhoan;
    });
    
    InDSNV(DSNV)
}
