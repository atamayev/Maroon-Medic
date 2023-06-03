export const handleAddPet = (petData, setPetData) => {
  setPetData([...petData, { pet_infoID: petData.length + 1, Name: '', Gender: '', DOB: '', petType: '', pet_listID: ''}]);
};
