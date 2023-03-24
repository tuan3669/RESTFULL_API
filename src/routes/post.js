const { Router } = require('express');
const controllers = require('../controllers/post');
const router = Router();
// Administrator (quản trị viên): Đây là nhóm người dùng có quyền hạn cao nhất, mặc định tài khoản tạo website WordPress chính là tài khoản admin.
// Editor (biên tập viên): Nhóm người dùng có nhiệm vụ chỉnh sửa bài viết của các thành viên cấp dưới.
// Author (tác giả): Nhóm người dùng có thể viết bài và tự đăng bài của họ lên.
// Contributor (cộng tác viên): Là nhóm người dùng có nhiệm vụ viết bài nhưng không thể đăng hay làm gì khác, phải chờ phê duyệt của Moderator hoặc Admin thì bài viết mới được xuất bản.
// Subscriber (người đăng ký): Đây là nhóm người dùng có quyền hạn thấp nhất, có chăng là được ưu tiên hơn so với khách truy cập về quyền sử dụng tài nguyên của website như bài viết, file đính kèm,…

// admin full quyền ko cần check
const { verifyAccessToken, checkRole, checkPermission } = require('../utils/jwt');
// get  by id
router.use(verifyAccessToken);
router.get('/:id', controllers.getById);
// get all
router.get('/', [checkRole('writer'), checkPermission('getAllProduct')], controllers.getAll);

// create a new post
router.post('/', controllers.create);

// updated a new post
router.put('/:id', controllers.updated);

// remove a new post
router.delete('/:id', controllers.remove);

module.exports = router;
