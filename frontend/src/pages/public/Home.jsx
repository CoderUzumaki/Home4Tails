import React from 'react'
import ProfileCard from '../../components/PetCard'
import dog1 from '../../assets/dogs/dog_adoption_01.jpg'
const Home = () => {
return (
    <div>
        <ProfileCard
            name="Buddy"
            breed="Golden Retriever"
            age="3 years"
            image={dog1}
        />
    </div>
)
}

export default Home
