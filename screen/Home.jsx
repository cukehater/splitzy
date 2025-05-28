import { StyleSheet, ScrollView, View, Pressable, Text } from 'react-native'
import UserCards from '../components/UserCards'
import { useState, useCallback } from 'react'

export default function Home() {
  const [splitCount, setSplitCount] = useState(2)
  const [totalCost, setTotalCost] = useState(0)
  const [userCosts, setUserCosts] = useState({})

  const handleDeleteUser = useCallback(index => {
    setSplitCount(prev => prev - 1)
    setUserCosts(prev => {
      const newUserCosts = { ...prev }
      delete newUserCosts[index]
      setTotalCost(
        Object.values(newUserCosts).reduce((sum, cost) => sum + cost, 0)
      )
      return newUserCosts
    })
  }, [])

  const handleCostChange = useCallback((index, cost) => {
    setUserCosts(prev => {
      const newUserCosts = { ...prev, [index]: cost }
      const newTotalCost = Object.values(newUserCosts).reduce(
        (sum, cost) => sum + cost,
        0
      )
      setTotalCost(newTotalCost)
      return newUserCosts
    })
  }, [])

  const handleAddUser = useCallback(() => {
    setSplitCount(prev => prev + 1)
  }, [])

  return (
    <View style={styles.mainContainer}>
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          {Array.from({ length: splitCount }).map((_, index) => (
            <UserCards
              key={index}
              index={index}
              onDelete={handleDeleteUser}
              onCostChange={handleCostChange}
            />
          ))}
        </View>

        <Pressable
          style={({ pressed }) => [styles.button, pressed && styles.pressed]}
          underlayColor='#f4511e'
          onPress={handleAddUser}
        >
          <Text style={styles.buttonText}>인원 추가</Text>
        </Pressable>
      </ScrollView>

      <View style={styles.totalCostContainer}>
        <Text style={styles.totalCostText}>
          총 비용: {totalCost.toLocaleString()}원
        </Text>
        <Pressable
          style={({ pressed }) => [
            styles.settleButton,
            pressed && styles.pressed
          ]}
          onPress={() => {
            // TODO: 정산 로직 구현
            console.log('정산하기')
          }}
        >
          <Text style={styles.settleButtonText}>정산하기</Text>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff'
  },
  container: {
    flex: 1,
    padding: 20
  },
  content: {
    gap: 10
  },
  button: {
    backgroundColor: '#f4511e',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBlock: 20
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  pressed: {
    opacity: 0.7
  },
  totalCostContainer: {
    backgroundColor: '#f4511e',
    paddingTop: 20,
    paddingBottom: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    gap: 12
  },
  totalCostText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
  },
  settleButton: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center'
  },
  settleButtonText: {
    color: '#f4511e',
    fontSize: 16,
    fontWeight: 'bold'
  }
})
