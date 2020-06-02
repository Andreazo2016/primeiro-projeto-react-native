import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';

import {
    Container,
    Header,
    Avatar,
    Name,
    Bio,
    Stars,
    Starred,
    OwnerAvatar,
    Info,
    Title,
    Author
} from './styles';

import api from '../../services/api';


const User = ({ route, navigation }) => {

    const [stars, setStars] = useState([])
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        async function getInfoUser() {
            setLoading(true)
            const response = await api.get(`/users/${user.login}/starred`)
            setStars(response.data)
            setLoading(false)
        }
        const { user } = route.params
        setUser(user)
        navigation.setOptions({ title: user.name })
        getInfoUser()
    }, [])
    return (
        <Container>
            <Header>
                <Avatar source={{ uri: user.avatar }} />
                <Name>{user.name}</Name>
                <Bio>{user.bio}</Bio>
            </Header>
            {
                loading ? <ActivityIndicator color="#7159c1" /> : (
                    <Stars
                        data={stars}
                        keyExtractor={start => String(start.id)}
                        renderItem={({ item }) => (
                            <Starred>
                                <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
                                <Info>
                                    <Title>{item.name}</Title>
                                    <Author>{item.owner.login}</Author>
                                </Info>
                            </Starred>
                        )}

                    />
                )
            }


        </Container>
    );
};

export default User;
