// src/pages/BaseDataPage.tsx
import { useParams } from 'react-router-dom';
import KeywordManage from '../components/base/KeywordManage';
import TraitManage from '../components/base/TraitManage';
import SinPropertyManage from '../components/base/SinPropertyManage';

const BaseDataPage = () => {
  const { type } = useParams<{ type: string }>();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">기초데이터 - {type}</h1>
      {type === 'keyword' && <KeywordManage />}
      {type === 'trait' && <TraitManage />}
      {type === 'sin-property' && <SinPropertyManage />}
      {!['keyword', 'trait', 'sin-property'].includes(type ?? '') && <p>유효하지 않은 경로입니다.</p>}
    </div>
  );
};

export default BaseDataPage;
