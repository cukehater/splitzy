import { useState } from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
  FlatList,
  Modal
} from 'react-native'
import { useNavigation } from '@react-navigation/native'

export default function AddExpense() {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')
  const [expenses, setExpenses] = useState([])

  const formatAmount = value => {
    // 숫자와 쉼표만 남기고 모두 제거
    const numericValue = value.replace(/[^0-9]/g, '')
    // 천단위 구분 기호 추가
    return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  const handleAmountChange = value => {
    setAmount(formatAmount(value))
  }

  const handleSave = () => {
    if (amount && description) {
      const newExpense = {
        id: Date.now().toString(),
        amount: parseInt(amount.replace(/,/g, '')),
        description,
        date: new Date().toISOString().split('T')[0]
      }
      setExpenses([...expenses, newExpense])
      setAmount('')
      setDescription('')
      setIsModalVisible(false)
    }
  }

  const renderExpenseItem = ({ item }) => (
    <View style={styles.expenseItem}>
      <View style={styles.expenseInfo}>
        <Text style={styles.expenseDescription}>{item.description}</Text>
      </View>
      <Text style={styles.expenseAmount}>{item.amount.toLocaleString()}원</Text>
    </View>
  )

  return (
    <View style={styles.container}>
      <FlatList
        data={expenses}
        renderItem={renderExpenseItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <Text style={styles.emptyText}>등록된 지출 내역이 없습니다</Text>
        }
      />

      <Pressable
        style={styles.addButton}
        onPress={() => setIsModalVisible(true)}
      >
        <Text style={styles.addButtonText}>지출 내역 추가</Text>
      </Pressable>

      <Modal
        visible={isModalVisible}
        animationType='none'
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>지출 내역 추가</Text>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>설명</Text>
              <TextInput
                style={styles.input}
                placeholder='지출 내역을 설명해주세요'
                value={description}
                onChangeText={setDescription}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>금액</Text>
              <TextInput
                style={styles.input}
                placeholder='지출 금액을 입력하세요'
                keyboardType='numeric'
                value={amount}
                onChangeText={handleAmountChange}
              />
            </View>

            <View style={styles.modalButtons}>
              <Pressable
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setIsModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>취소</Text>
              </Pressable>
              <Pressable
                style={[styles.modalButton, styles.saveButton]}
                onPress={handleSave}
              >
                <Text style={styles.saveButtonText}>저장</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  listContainer: {
    padding: 16,
    paddingBottom: 80
  },
  expenseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 8
  },
  expenseInfo: {
    flex: 1
  },
  expenseDescription: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4
  },
  expenseAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#f4511e'
  },
  emptyText: {
    textAlign: 'center',
    color: '#666',
    marginTop: 20
  },
  addButton: {
    position: 'absolute',
    bottom: 35,
    left: 20,
    right: 20,
    backgroundColor: '#f4511e',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center'
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    width: '90%',
    maxWidth: 400
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  inputContainer: {
    marginBottom: 16
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20
  },
  modalButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 8
  },
  cancelButton: {
    backgroundColor: '#f1f1f1'
  },
  saveButton: {
    backgroundColor: '#f4511e'
  },
  cancelButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold'
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  }
})
