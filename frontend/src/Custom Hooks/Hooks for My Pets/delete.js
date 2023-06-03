export const handleDeletePet = (pet_infoID, petData, setPetData) => {
    setPetData(petData.filter(pet => pet.pet_infoID !== pet_infoID));
};
