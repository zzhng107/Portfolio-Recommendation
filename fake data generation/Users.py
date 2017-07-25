import numpy as np

class Users:

	def __init__(self):
		self.attributes = abs(np.random.randn(10)+5)

	def distanceto(self, otherusers):
		for i in range(len(otherusers)):
			yield np.dot(self.attributes,otherusers[i].attributes)

	# def normalization(self):
	# some normalization for

