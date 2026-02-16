import { useQuery } from '@tanstack/react-query';
import { nanoid } from 'nanoid';
import { useState } from 'react';

import memberApi from '@/apis/member/memberApi';
import { Modal } from '@/components/common/Modal';
import { Payments } from '@/components/payments/Payments';
import { PaymentsWidget } from '@/components/payments/PaymentsWidget';
import usePostFreeOrder from '@/hooks/mutation/usePostFreeOrder';
import { useProduct } from '@/hooks/zustand/useProduct';

export const PaymentsCheckout = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { amount, discount, totalAmount, issuedCouponId } = useProduct();
  const { postFreeOrder } = usePostFreeOrder(totalAmount);
  const { data: dashboard } = useQuery({
    queryKey: ['member'],
    queryFn: memberApi.GET_DASHBOARD
  });

  const nextClickHandler = () => {
    if (!totalAmount && dashboard) {
      const id = nanoid();
      postFreeOrder({
        orderNanoId: id,
        membershipId: dashboard.currentMembership.membershipId,
        issuedCouponId: issuedCouponId,
        totalAmount: amount,
        discountAmount: discount,
        finalPaymentAmount: totalAmount
      });
      return;
    }
    setIsModalOpen(true);
  };

  return (
    <>
      <Payments onNext={nextClickHandler} />
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <PaymentsWidget />
      </Modal>
    </>
  );
};
