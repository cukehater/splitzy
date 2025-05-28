import { useState, useEffect, useCallback, memo } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { Swipeable } from 'react-native-gesture-handler'

const Button = memo(({ text, onPress }) => {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{text}</Text>
    </Pressable>
  )
})

const UserCards = memo(({ index, onDelete, onCostChange }) => {
  const navigation = useNavigation()
  const [userName, setUserName] = useState(
    `사용자${(index + 1).toString().padStart(2, '0')}`
  )
  const [cost, setCost] = useState(0)

  useEffect(() => {
    onCostChange?.(index, cost)
  }, [cost, index, onCostChange])

  const handleNavigation = useCallback(() => {
    navigation.navigate('AddExpense')
  }, [navigation])

  const handleDelete = useCallback(() => {
    onDelete(index)
  }, [onDelete, index])

  const renderRightActions = () => {
    if (index <= 1) return null

    return (
      <Pressable style={styles.deleteAction} onPress={handleDelete}>
        <Text style={styles.deleteActionText}>삭제</Text>
      </Pressable>
    )
  }

  return (
    <Swipeable
      renderRightActions={renderRightActions}
      rightThreshold={40}
      overshootRight={false}
      friction={2}
      rightOpenValue={-80}
      useNativeAnimations={true}
      enableTrackpadTwoFingerGesture={true}
      dragFromEdgeEnabled={true}
    >
      <View style={styles.container}>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{userName}</Text>
          <Text style={styles.cost}>💸 {cost.toLocaleString()}원</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button text='지출 내역' onPress={handleNavigation} />
        </View>
      </View>
    </Swipeable>
  )
})

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 12,
    borderRadius: 5,
    marginVertical: 4,
    height: 60
  },
  userInfo: {
    flex: 1
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4
  },
  cost: {
    fontSize: 14,
    color: '#666'
  },
  buttonContainer: {
    marginLeft: 'auto'
  },
  button: {
    backgroundColor: '#f4511e',
    padding: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold'
  },
  deleteAction: {
    backgroundColor: '#ff3b30',
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    marginTop: 4,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5
  },
  deleteActionText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold'
  }
})

export default UserCards
