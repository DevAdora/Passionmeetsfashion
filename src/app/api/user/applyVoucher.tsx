export default function applyVoucher(voucherCode: string) {
  if (voucherCode === "DISCOUNT10") {
    return { success: true, discount: 10 };
  } else {
    return { success: false, message: "Invalid voucher code" };
  }
}
