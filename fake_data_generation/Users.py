import numpy as np

class Users:

	def __init__(self):
		self.attributes = (np.random.randn(20))

	def distanceto(self, otherusers):
		for i in range(len(otherusers)):
			yield np.dot(self.attributes,otherusers[i].attributes)

	# def normalization(self):
	# some normalization for

