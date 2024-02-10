// C:\Users\mugey\OneDrive\Masaüstü\graphic-design-admin\src\pages\edit\[id].jsx

import * as React from 'react';
import { useRouter } from 'next/router';

const EditItemPage = ({ items }) => {
  const router = useRouter();
  const { id } = router.query;

  const selectedItem = items.find(item => item.id === parseInt(id));

  const itemName = selectedItem ? selectedItem.name : 'Unknown';

  return (
    <div>
      <h1>Edit Item: {id}</h1>
      <h2>Name: {itemName}</h2>
    </div>
  );
}

export default EditItemPage;
