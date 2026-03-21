import './style.css';

document.addEventListener('DOMContentLoaded', () => {
    const heart = document.getElementById('heart');
    const envelopeWrapper = document.getElementById('envelope-wrapper');
    const instruction = document.getElementById('instruction');
    const overlay = document.getElementById('overlay');
    const closeBtn = document.getElementById('close-btn');

    // Mới thêm
    const agreeBtn = document.getElementById('agree-btn');
    const dresscodeForm = document.getElementById('dresscode-form');
    const successMsg = document.getElementById('success-msg');
    const dresscodeInput = document.getElementById('dresscode-input');

    heart.addEventListener('click', () => {
        envelopeWrapper.classList.add('open');
        instruction.classList.add('hide');

        setTimeout(() => {
            envelopeWrapper.classList.add('slide');
            
            setTimeout(() => {
                envelopeWrapper.classList.add('read');
                overlay.classList.add('show');
            }, 600);
        }, 600);
    });

    const closeLetter = () => {
        envelopeWrapper.classList.remove('read');
        overlay.classList.remove('show');

        setTimeout(() => {
            envelopeWrapper.classList.remove('slide');
            
            setTimeout(() => {
                envelopeWrapper.classList.remove('open');
                instruction.classList.remove('hide');
            }, 600);
        }, 700);
    };

    closeBtn.addEventListener('click', closeLetter);
    overlay.addEventListener('click', closeLetter);

    // Xử lý sự kiện bấm nút
    agreeBtn.addEventListener('click', () => {
        agreeBtn.classList.add('hide');
        dresscodeForm.classList.remove('hide');
        
        // Cuộn xuống cuối để thấy form
        const letterInner = document.querySelector('.letter-inner');
        setTimeout(() => {
            letterInner.scrollTo({
                top: letterInner.scrollHeight,
                behavior: 'smooth'
            });
        }, 50);
    });

    // Xử lý sự kiện gửi form
    dresscodeForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const color = dresscodeInput.value.trim();
        
        if (!color) return;

        // Đổi chữ nút khi đang gửi
        const submitBtn = dresscodeForm.querySelector('.btn-submit');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Đang gửi... 🚀';
        submitBtn.disabled = true;

        /* 
        ========================================================================
         BẠN KHÔNG CẦN BACKEND PHỨC TẠP! DƯỚI ĐÂY LÀ 2 CÁCH PHỔ BIẾN & MIỄN PHÍ:
        ========================================================================
        */

        const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mvzwnqgo';

        try {
            // Gửi dữ liệu thật về email của bạn thông qua Formspree
            await fetch(FORMSPREE_ENDPOINT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify({ 
                    message: `🚀 [CÓ TIN NHẮN] Nàng đã chốt kèo! \n👗 Dresscode ngày hôm đó nàng sẽ mặc: ${color}` 
                })
            });

            // Ẩn form và show thông báo thành công
            dresscodeForm.classList.add('hide');
            successMsg.classList.remove('hide');
            
            // Xóa nội dung
            dresscodeInput.value = '';
            
        } catch (error) {
            console.error('Lỗi:', error);
            alert('Máy chủ đang kẹt giữa các vì sao! Em chụp màn hình lại màu rồi gửi anh nha!');
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });

});
