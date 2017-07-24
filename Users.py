import numpy

class Users:

	def __init__(self):
		self.attributes = abs(numpy.random.randn(10))

	def distanceto(self, otherusers):
		for i in range(len(otherusers)):
			yield numpy.dot(self.attributes,otherusers[i].attributes)

	# def normalization(self):
	# some normalization for

